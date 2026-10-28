import { router } from 'expo-router';
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const background = require('../../assets/images/ihunt-home-background.png');

const roomCode = 'AB12CD';

const players = [
  {
    name: 'You',
    detail: 'Host',
    initials: 'Y',
    color: '#D8F0D7',
    joined: true,
  },
  {
    name: 'Player 2',
    detail: 'Waiting',
    initials: '+',
    color: '#BDEAF7',
    joined: false,
  },
  {
    name: 'Player 3',
    detail: 'Optional',
    initials: '+',
    color: '#FBE5DC',
    joined: false,
  },
];

export default function CreateGameScreen() {
  const copyRoomCode = () => {
    Alert.alert('Room Code', `${roomCode} is ready to share.`);
  };

  const editSettings = () => {
    Alert.alert('Game Settings', 'Game settings will be added next.');
  };

  const startGame = () => {
    Alert.alert(
      'Waiting for players',
      'Invite at least one more player before starting the game.',
    );
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={background}
        resizeMode="cover"
        style={styles.hero}
      >
        <SafeAreaView style={styles.heroSafeArea}>
          <View style={styles.header}>
            <Pressable
              accessibilityLabel="Go back"
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <Text style={styles.headerTitle}>Create Game</Text>

            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.heroCopy}>
            <Text style={styles.heroTitle}>Your adventure starts here</Text>
            <Text style={styles.heroSubtitle}>
              Create a private room and invite your friends.
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <SafeAreaView style={styles.sheet} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.roomCard}>
            <Text style={styles.roomLabel}>Room Code</Text>
            <Text style={styles.roomCode}>{roomCode}</Text>

            <Pressable style={styles.copyButton} onPress={copyRoomCode}>
              <View style={styles.copyIcon}>
                <View style={styles.copyBack} />
                <View style={styles.copyFront} />
              </View>
              <Text style={styles.copyText}>Copy Code</Text>
            </Pressable>
          </View>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Players</Text>
            <Text style={styles.playerCount}>1 of 3 joined</Text>
          </View>

          <View style={styles.playersCard}>
            {players.map((player) => (
              <View key={player.name} style={styles.playerSlot}>
                <View style={[styles.avatar, { backgroundColor: player.color }]}>
                  <Text
                    style={[
                      styles.avatarText,
                      !player.joined && styles.emptyAvatarText,
                    ]}
                  >
                    {player.initials}
                  </Text>
                </View>

                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerDetail}>{player.detail}</Text>

                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: player.joined ? '#25A15F' : '#C6D0CB' },
                  ]}
                />
              </View>
            ))}
          </View>

          <View style={styles.settingsCard}>
            <View style={styles.settingsHeadingRow}>
              <View>
                <Text style={styles.settingsTitle}>Game Settings</Text>
                <Text style={styles.settingsSubtitle}>
                  Choose how this hunt will work.
                </Text>
              </View>

              <Text style={styles.settingsIcon}>⚙</Text>
            </View>

            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingName}>Lives</Text>
                <Text style={styles.settingHint}>How many chances each player gets</Text>
              </View>
              <Text style={styles.settingValue}>3</Text>
            </View>

            <View style={styles.settingDivider} />

            <View style={styles.settingRow}>
              <View>
                <Text style={styles.settingName}>Turn time</Text>
                <Text style={styles.settingHint}>Time to complete each prompt</Text>
              </View>
              <Text style={styles.settingValue}>60 sec</Text>
            </View>

            <Pressable style={styles.editButton} onPress={editSettings}>
              <Text style={styles.editButtonText}>Edit Game Settings</Text>
            </Pressable>
          </View>

          <Pressable style={styles.startButton} onPress={startGame}>
            <Text style={styles.playIcon}>▶</Text>
            <Text style={styles.startButtonText}>Start Game</Text>
          </Pressable>

          <Text style={styles.startHint}>
            The host can start after another player joins.
          </Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFFDF8',
  },
  hero: {
    height: 270,
    width: '100%',
  },
  heroSafeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    color: '#123026',
    fontSize: 42,
    fontWeight: '300',
    lineHeight: 42,
  },
  headerTitle: {
    color: '#123026',
    fontSize: 22,
    fontWeight: '800',
  },
  headerSpacer: {
    width: 42,
  },
  heroCopy: {
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingTop: 42,
  },
  heroTitle: {
    color: '#123026',
    fontSize: 27,
    fontWeight: '900',
    textAlign: 'center',
  },
  heroSubtitle: {
    marginTop: 8,
    color: '#123026',
    fontSize: 15,
    textAlign: 'center',
  },
  sheet: {
    flex: 1,
    marginTop: -28,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFFDF8',
  },
  sheetContent: {
    paddingBottom: 18,
  },
  roomCard: {
    alignItems: 'center',
    padding: 18,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    shadowColor: '#123026',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  roomLabel: {
    color: '#68736D',
    fontSize: 15,
  },
  roomCode: {
    marginTop: 3,
    color: '#123026',
    fontSize: 39,
    fontWeight: '900',
    letterSpacing: 3,
  },
  copyButton: {
    minWidth: 150,
    height: 42,
    marginTop: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DFF2D8',
  },
  copyIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    position: 'relative',
  },
  copyBack: {
    position: 'absolute',
    top: 1,
    left: 1,
    width: 13,
    height: 13,
    borderWidth: 2,
    borderColor: '#123026',
    borderRadius: 3,
  },
  copyFront: {
    position: 'absolute',
    right: 1,
    bottom: 1,
    width: 13,
    height: 13,
    borderWidth: 2,
    borderColor: '#123026',
    borderRadius: 3,
    backgroundColor: '#DFF2D8',
  },
  copyText: {
    color: '#123026',
    fontSize: 15,
    fontWeight: '800',
  },
  sectionHeader: {
    marginTop: 21,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#123026',
    fontSize: 20,
    fontWeight: '800',
  },
  playerCount: {
    color: '#727A75',
    fontSize: 14,
  },
  playersCard: {
    paddingVertical: 15,
    paddingHorizontal: 8,
    borderRadius: 21,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#F7F7F2',
  },
  playerSlot: {
    width: '31%',
    alignItems: 'center',
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#123026',
    fontSize: 24,
    fontWeight: '900',
  },
  emptyAvatarText: {
    color: '#368AAA',
    fontSize: 30,
    fontWeight: '400',
  },
  playerName: {
    marginTop: 8,
    color: '#123026',
    fontSize: 14,
    fontWeight: '800',
  },
  playerDetail: {
    marginTop: 2,
    color: '#727A75',
    fontSize: 12,
  },
  statusDot: {
    width: 9,
    height: 9,
    marginTop: 7,
    borderRadius: 5,
  },
  settingsCard: {
    marginTop: 18,
    padding: 18,
    borderRadius: 21,
    backgroundColor: '#EAF6E7',
  },
  settingsHeadingRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  settingsTitle: {
    color: '#123026',
    fontSize: 19,
    fontWeight: '800',
  },
  settingsSubtitle: {
    marginTop: 4,
    color: '#55705E',
    fontSize: 13,
  },
  settingsIcon: {
    color: '#176A43',
    fontSize: 23,
  },
  settingRow: {
    minHeight: 48,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingName: {
    color: '#123026',
    fontSize: 15,
    fontWeight: '700',
  },
  settingHint: {
    maxWidth: 235,
    marginTop: 3,
    color: '#63756A',
    fontSize: 12,
  },
  settingValue: {
    color: '#176A43',
    fontSize: 17,
    fontWeight: '900',
  },
  settingDivider: {
    height: 1,
    marginTop: 12,
    backgroundColor: '#D5E6D2',
  },
  editButton: {
    height: 45,
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  editButtonText: {
    color: '#176A43',
    fontSize: 15,
    fontWeight: '800',
  },
  startButton: {
    height: 64,
    marginTop: 18,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5654F',
  },
  playIcon: {
    marginRight: 12,
    color: '#FFFFFF',
    fontSize: 22,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  startHint: {
    marginTop: 9,
    color: '#727A75',
    fontSize: 13,
    textAlign: 'center',
  },
});
