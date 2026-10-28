import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const comingSoon = (screen: string) => {
    Alert.alert(screen, 'This screen will be built next.');
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.logo}>iHunt</Text>
              <Text style={styles.greeting}>Ready to hunt?</Text>
            </View>

            <Pressable style={styles.profileButton}>
              <Text style={styles.profileIcon}>👤</Text>
            </Pressable>
          </View>

          <View style={styles.heroCard}>
            <Text style={styles.heroIcon}>🏕️</Text>
            <Text style={styles.heroTitle}>
              Explore. Discover. Hunt together.
            </Text>
            <Text style={styles.heroText}>
              Challenge your friends and complete photo missions.
            </Text>
          </View>

          <Pressable
            style={[styles.button, styles.createButton]}
            onPress={() => comingSoon('Create Game')}
          >
            <Text style={styles.buttonText}>＋ Create Game</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.joinButton]}
            onPress={() => comingSoon('Join Game')}
          >
            <Text style={styles.joinText}>👥 Join Game</Text>
          </Pressable>

          <View style={styles.recentCard}>
            <Text style={styles.sectionTitle}>Recent Room</Text>
            <Text style={styles.roomCode}>AB12CD</Text>
            <Text style={styles.roomStatus}>2 players · Waiting</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9ED',
  },
  safeArea: {
    flex: 1,
  },
  content: {
    padding: 24,
    gap: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: '#14532D',
  },
  greeting: {
    marginTop: 6,
    fontSize: 26,
    fontWeight: '800',
    color: '#123026',
  },
  profileButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DFF5FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    fontSize: 24,
  },
  heroCard: {
    padding: 24,
    borderRadius: 28,
    backgroundColor: '#DFF5FF',
  },
  heroIcon: {
    fontSize: 48,
  },
  heroTitle: {
    marginTop: 12,
    fontSize: 23,
    fontWeight: '800',
    color: '#123026',
  },
  heroText: {
    marginTop: 8,
    fontSize: 16,
    color: '#355B54',
    lineHeight: 23,
  },
  button: {
    minHeight: 62,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButton: {
    backgroundColor: '#F5654F',
  },
  joinButton: {
    backgroundColor: '#BDEAF7',
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: '800',
  },
  joinText: {
    color: '#123026',
    fontSize: 19,
    fontWeight: '800',
  },
  recentCard: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    color: '#64716B',
    fontSize: 15,
  },
  roomCode: {
    marginTop: 8,
    color: '#14532D',
    fontSize: 25,
    fontWeight: '800',
  },
  roomStatus: {
    marginTop: 4,
    color: '#64716B',
    fontSize: 15,
  },
});
