import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { Colors, Spacing, Shadows } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (
      username === process.env.EXPO_PUBLIC_USERNAME &&
      password === process.env.EXPO_PUBLIC_PASSWORD
    ) {
      await login(username);
      router.replace('/(tabs)/home');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} bounces={false} keyboardShouldPersistTaps="handled">
        <LinearGradient
          colors={Colors.light.gradient}
          style={styles.header}
        >
          <View style={styles.logoContainer}>
              <Image
                source={require('@/assets/images/bitezy-logo.png')}
                style={styles.logoImage}
                resizeMode="contain"
              />
              <Text style={styles.logoSubtext}>Deliciousness Delivered</Text>
          </View>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Login to continue ordering your favorite food</Text>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <LinearGradient
              colors={Colors.light.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradientButton}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  logoSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    // marginTop: 5,
  },
  content: {
    flex: 1,
    padding: Spacing.l,
    marginTop: -40,
    backgroundColor: '#fff',
    marginHorizontal: Spacing.m,
    borderRadius: 30,
    ...Platform.select({
      ios: Shadows.medium,
      android: {
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      default: {},
    }),
    marginBottom: Spacing.xxxl,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.light.text,
    textAlign: 'center',
    marginTop: Spacing.l,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  inputContainer: {
    marginBottom: Spacing.m,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  input: {
    height: 55,
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    paddingHorizontal: Spacing.m,
    fontSize: 16,
    color: Colors.light.text,
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginBottom: Spacing.m,
  },
  loginButton: {
    marginTop: Spacing.l,
    borderRadius: 15,
    overflow: 'hidden',
    ...Shadows.light,
  },
  gradientButton: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footerLink: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    color: Colors.light.textSecondary,
    fontSize: 14,
  },
  footerLinkText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
