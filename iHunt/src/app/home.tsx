import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const homeBackground = require('../../assets/images/ihunt-home-background.png');

export default function HomeScreen() {
  const { height } = useWindowDimensions();
  const heroHeight = Math.min(410, height * 0.47);

  const comingSoon = (screen: string) => {
    Alert.alert(screen, 'This screen will be built next.');
  };

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={homeBackground}
        resizeMode="cover"
        style={[styles.hero, { height: heroHeight }]}
      >
        <SafeAreaView style={styles.heroSafeArea}>
          <View style={styles.header}>
            <Text style={styles.logo}>iHunt</Text>

            <Pressable
              accessibilityLabel="Profile"
              style={styles.profileButton}
              onPress={() => comingSoon('Profile')}
            >
              <View style={styles.profileHead} />
              <View style={styles.profileBody} />
            </Pressable>
          </View>

          <View style={styles.heroCopy}>
            <Text style={styles.title}>Ready to hunt?</Text>

            <Text style={styles.subtitle}>
              Explore the world. Find the things.{'\n'}
              Share the adventure.
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>

      <SafeAreaView style={styles.bottomSheet} edges={['bottom']}>
        <ScrollView
          contentContainerStyle={styles.sheetContent}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            style={[styles.actionButton, styles.createButton]}
            onPress={() => comingSoon('Create Game')}
          >
            <View style={styles.plusCircle}>
              <Text style={styles.plusText}>+</Text>
            </View>

            <Text style={styles.createButtonText}>Create Game</Text>
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.joinButton]}
            onPress={() => comingSoon('Join Game')}
          >
            <View style={styles.peopleIcon}>
              <View style={[styles.personHead, styles.personHeadLeft]} />
              <View style={[styles.personHead, styles.personHeadRight]} />
              <View style={[styles.personBody, styles.personBodyLeft]} />
              <View style={[styles.personBody, styles.personBodyRight]} />
            </View>

            <Text style={styles.joinButtonText}>Join Game</Text>
          </Pressable>

          <Pressable
            style={styles.recentCard}
            onPress={() => comingSoon('Recent Room')}
          >
            <Text style={styles.recentTitle}>Recent Room</Text>

            <View style={styles.roomRow}>
              <Image source={homeBackground} style={styles.roomThumbnail} />

              <View style={styles.roomInfo}>
                <Text style={styles.roomCode}>AB12CD</Text>
                <Text style={styles.roomStatus}>2 players · Waiting</Text>
              </View>

              <Text style={styles.arrow}>›</Text>
            </View>
          </Pressable>
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
    width: '100%',
  },
  heroSafeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 26,
    paddingTop: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    color: '#123026',
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E9E2',
  },
  profileHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#0B4740',
  },
  profileBody: {
    width: 20,
    height: 10,
    marginTop: 4,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#0B4740',
  },
  heroCopy: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 39,
  },
  title: {
    color: '#123026',
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: -0.8,
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    color: '#123026',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
  },
  bottomSheet: {
    flex: 1,
    marginTop: -1,
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#FFFDF8',
  },
  sheetContent: {
    paddingBottom: 12,
  },
  actionButton: {
    height: 68,
    marginBottom: 14,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    backgroundColor: '#F5654F',
  },
  joinButton: {
    backgroundColor: '#BDEAF7',
  },
  plusCircle: {
    width: 31,
    height: 31,
    marginRight: 12,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  plusText: {
    marginTop: -3,
    color: '#F5654F',
    fontSize: 28,
    fontWeight: '500',
    lineHeight: 31,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  joinButtonText: {
    color: '#123026',
    fontSize: 20,
    fontWeight: '800',
  },
  peopleIcon: {
    width: 35,
    height: 28,
    marginRight: 12,
    position: 'relative',
  },
  personHead: {
    position: 'absolute',
    top: 0,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#0B4740',
  },
  personHeadLeft: {
    left: 5,
  },
  personHeadRight: {
    right: 3,
  },
  personBody: {
    position: 'absolute',
    bottom: 0,
    width: 18,
    height: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#0B4740',
  },
  personBodyLeft: {
    left: 0,
  },
  personBodyRight: {
    right: 0,
  },
  recentCard: {
    padding: 15,
    borderRadius: 23,
    backgroundColor: '#F7F7F2',
  },
  recentTitle: {
    marginBottom: 10,
    color: '#59635E',
    fontSize: 15,
  },
  roomRow: {
    minHeight: 66,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
  },
  roomThumbnail: {
    width: 52,
    height: 52,
    borderRadius: 10,
  },
  roomInfo: {
    flex: 1,
    marginLeft: 12,
  },
  roomCode: {
    color: '#123026',
    fontSize: 18,
    fontWeight: '800',
  },
  roomStatus: {
    marginTop: 3,
    color: '#727A75',
    fontSize: 15,
  },
  arrow: {
    marginRight: 8,
    color: '#738079',
    fontSize: 34,
    fontWeight: '300',
  },
});