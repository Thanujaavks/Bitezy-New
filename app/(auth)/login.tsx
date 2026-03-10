import React, {useState} from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {ThemedTextInput} from '@/components/themed-text-input';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Stack, useRouter} from 'expo-router';
import {useAuth} from '@/context/AuthContext';
import {Colors, Shadows, Spacing} from '@/constants/theme';
import {LinearGradient} from 'expo-linear-gradient';

function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showErrors, setShowErrors] = useState(false);
    const {login} = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        setShowErrors(true);

        if (!username || !password) return;

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

    const screenContent = (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    style={styles.scrollView}
                    contentContainerStyle={styles.scrollContent}
                    bounces={false}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                    <LinearGradient colors={Colors.light.gradient} style={styles.header}>
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
                        <Text style={styles.subtitle}>
                            Login to continue ordering your favorite food
                        </Text>

                        {error ? <Text style={styles.errorText}>{error}</Text> : null}

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Username</Text>
                            <ThemedTextInput
                                style={[styles.input, !username && showErrors && styles.inputError]}
                                placeholder="Enter your username"
                                value={username}
                                onChangeText={(text) => {
                                    setUsername(text);
                                    if (text) setShowErrors(false);
                                }}
                                autoCapitalize="none"
                            />
                            {!username && showErrors && (
                                <Text style={styles.fieldErrorText}>Username is required</Text>
                            )}
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Password</Text>
                            <ThemedTextInput
                                style={[styles.input, !password && showErrors && styles.inputError]}
                                placeholder="Enter your password"
                                value={password}
                                onChangeText={(text) => {
                                    setPassword(text);
                                    if (text) setShowErrors(false);
                                }}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                            {!password && showErrors && (
                                <Text style={styles.fieldErrorText}>Password is required</Text>
                            )}
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <LinearGradient
                                colors={Colors.light.gradient}
                                start={{x: 0, y: 0}}
                                end={{x: 1, y: 0}}
                                style={styles.gradientButton}
                            >
                                <Text style={styles.loginButtonText}>Login</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );

    return (
        <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
            <Stack.Screen options={{headerShown: false}}/>
            {screenContent}
        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingBottom: 24,
    },
    header: {
        height: 300,
        alignItems: 'center',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    logoContainer: {
        alignItems: 'center',
        paddingTop: Spacing.xl,
    },
    logoImage: {
        width: 120,
        height: 120,
        marginBottom: 5,
        marginTop: Spacing.l
    },
    logoSubtext: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
    },
    content: {
        flex: 1,
        padding: Spacing.l,
        marginTop: -40,
        backgroundColor: '#fff',
        marginHorizontal: Spacing.m,
        borderRadius: 30,
        marginBottom: Spacing.xxl,
        ...Platform.select({
            ios: Shadows.medium,
            android: {
                elevation: 5,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 4},
                shadowOpacity: 0.15,
                shadowRadius: 12,
            },
            default: {},
        }),
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
});
