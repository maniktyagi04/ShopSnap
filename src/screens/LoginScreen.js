import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { Input, Button } from '../components';

const LoginScreen = ({ navigation, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            onLogin(); 
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Sign in to continue</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        icon="mail-outline"
                    />
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        icon="lock-closed-outline"
                    />

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Button
                        title="Login"
                        onPress={handleLogin}
                        loading={loading}
                        style={styles.button}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.link}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
        padding: SPACING.l,
        justifyContent: 'center',
    },
    header: {
        marginBottom: SPACING.xl,
    },
    title: {
        fontSize: FONTS.size.xxl,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.s,
    },
    subtitle: {
        fontSize: FONTS.size.m,
        color: COLORS.textLight,
    },
    form: {
        marginBottom: SPACING.xl,
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: SPACING.l,
    },
    forgotPasswordText: {
        color: COLORS.primary,
        fontSize: FONTS.size.s,
        fontWeight: '600',
    },
    button: {
        marginTop: SPACING.m,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        color: COLORS.textLight,
        fontSize: FONTS.size.m,
    },
    link: {
        color: COLORS.primary,
        fontSize: FONTS.size.m,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
