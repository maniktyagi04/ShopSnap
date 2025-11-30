import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { Input, Button } from '../components';

const SignUpScreen = ({ navigation, onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            onLogin(); // Call parent handler to switch to main app
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.content}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Sign up to get started</Text>
                </View>

                <View style={styles.form}>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        value={name}
                        onChangeText={setName}
                        icon="person-outline"
                    />
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
                        placeholder="Create a password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        icon="lock-closed-outline"
                    />

                    <Button
                        title="Sign Up"
                        onPress={handleSignUp}
                        loading={loading}
                        style={styles.button}
                    />
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
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

export default SignUpScreen;
