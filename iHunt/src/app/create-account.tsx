import { router } from 'expo-router';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const background = require('../../assets/images/ihunt-home-background.png');

export default function CreateAccountScreen() {
  return (
    <ImageBackground
      source={background}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Pressable
              accessibilityLabel="Go back"
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={styles.backIcon}>‹</Text>
            </Pressable>

            <Text style={styles.headerTitle}>Create Account</Text>

            <View style={styles.headerSpacer} />
          </View>

          <View style={styles.brandArea}>
            <Text style={styles.logo}>iHunt</Text>
            <Text style={styles.tagline}>Start your next adventure.</Text>
          </View>

          <View style={styles.formSheet}>
            <ScrollView
              contentContainerStyle={styles.formContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.formTitle}>Create your account</Text>
              <Text style={styles.formSubtitle}>
                Join friends and start hunting together.
              </Text>

              <View style={styles.inputBox}>
                <Text style={styles.inputIcon}>●</Text>
                <TextInput
                  placeholder="Name"
                  placeholderTextColor="#7B817D"
                  style={styles.input}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.inputIcon}>✉</Text>
                <TextInput
                  placeholder="Email"
                  placeholderTextColor="#7B817D"
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
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
              </View>

              <View style={styles.inputBox}>
                <Text style={styles.inputIcon}>🔒</Text>
                <TextInput
                  placeholder="Confirm Password"
                  placeholderTextColor="#7B817D"
                  style={styles.input}
                  secureTextEntry
                />
              </View>

              <Pressable
                style={styles.createButton}
                onPress={() => router.replace('/home')}
              >
                <Text style={styles.createButtonText}>Create Account</Text>
              </Pressable>

              <View style={styles.signInRow}>
                <Text style={styles.signInPrompt}>Already have an account?</Text>
                <Pressable onPress={() => router.replace('/login')}>
                  <Text style={styles.signInLink}> Sign In</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 4,
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
    fontSize: 21,
    fontWeight: '800',
  },
  headerSpacer: {
    width: 42,
  },
  brandArea: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 28,
  },
  logo: {
    color: '#123026',
    fontSize: 48,
    fontWeight: '900',
    letterSpacing: -1.5,
  },
  tagline: {
    marginTop: 3,
    color: '#123026',
    fontSize: 15,
  },
  formSheet: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: '#FFFDF8',
  },
  formContent: {
    paddingBottom: 18,
  },
  formTitle: {
    color: '#123026',
    fontSize: 25,
    fontWeight: '900',
  },
  formSubtitle: {
    marginTop: 6,
    marginBottom: 20,
    color: '#68736D',
    fontSize: 15,
  },
  inputBox: {
    height: 56,
    marginBottom: 13,
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
    color: '#3E4943',
    fontSize: 17,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 7,
    color: '#123026',
    fontSize: 16,
  },
  createButton: {
    height: 62,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    backgroundColor: '#176A43',
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '800',
  },
  signInRow: {
    marginTop: 22,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInPrompt: {
    color: '#6F7772',
    fontSize: 15,
  },
  signInLink: {
    color: '#176A43',
    fontSize: 15,
    fontWeight: '800',
  },
});
