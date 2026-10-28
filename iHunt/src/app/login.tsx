import { router } from 'expo-router';
import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const background = require('../../assets/images/ihunt-background.png');

export default function LoginScreen() {
  return (
    <ImageBackground
      source={background}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.brandArea}>
          <View style={styles.logoCircle}>
            <Text style={styles.cameraIcon}>📷</Text>
          </View>

          <Text style={styles.logo}>iHunt</Text>

          <Text style={styles.tagline}>
            Explore. Discover. Hunt Together.
          </Text>
        </View>

        <View style={styles.loginSheet}>
          <View style={styles.inputBox}>
            <Text style={styles.inputIcon}>✉</Text>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#7B817D"
              style={styles.input}
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.inputIcon}>🔒</Text>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#7B817D"
              style={styles.input}
              secureTextEntry
            />
            <Text style={styles.eyeIcon}>◉</Text>
          </View>

          <Pressable
            style={styles.signInButton}
            onPress={() => router.replace('/home')}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </Pressable>

          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <Pressable
            onPress={() =>
              Alert.alert('Create Account', 'This feature will be added later.')
            }
          >
            <Text style={styles.createAccount}>Create Account</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  brandArea: {
    alignItems: 'center',
    paddingTop: 65,
  },
  logoCircle: {
    width: 105,
    height: 105,
    borderRadius: 53,
    borderWidth: 12,
    borderColor: '#17633D',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDF8',
  },
  cameraIcon: {
    fontSize: 42,
  },
  logo: {
    marginTop: 8,
    fontSize: 58,
    fontWeight: '900',
    color: '#123026',
  },
  tagline: {
    marginTop: 2,
    fontSize: 15,
    color: '#123026',
  },
  loginSheet: {
    padding: 22,
    paddingTop: 28,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#FFFDF8',
  },
  inputBox: {
    height: 56,
    marginBottom: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D9DED9',
    borderRadius: 14,
    backgroundColor: '#FFFEFB',
  },
  inputIcon: {
    width: 28,
    fontSize: 21,
    color: '#3E4943',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#123026',
  },
  eyeIcon: {
    fontSize: 18,
    color: '#52605A',
  },
  signInButton: {
    height: 62,
    marginTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: '#176A43',
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  orRow: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#CBD1CC',
  },
  orText: {
    marginHorizontal: 16,
    color: '#6F7772',
    fontSize: 15,
  },
  createAccount: {
    textAlign: 'center',
    color: '#176A43',
    fontSize: 17,
    fontWeight: '800',
  },
});