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
  const [showErrors, setShowErrors] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setShowErrors(true);
    if (!username || !password) {
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
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
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
              style={[styles.input, !username && showErrors && styles.inputError]}
              placeholder="Enter your username"
              value={username}
              onChangeText={(text) => {
                setUsername(text);
                if (text) setShowErrors(false);
              }}
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            {!username && showErrors && <Text style={styles.fieldErrorText}>user name required</Text>}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, !password && showErrors && styles.inputError]}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (text) setShowErrors(false);
              }}
              secureTextEntry
              autoCapitalize="none"
              placeholderTextColor="#999"
            />
            {!password && showErrors && <Text style={styles.fieldErrorText}>Password is required</Text>}
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
  fieldErrorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  inputError: {
    borderColor: '#FF3B30',
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
