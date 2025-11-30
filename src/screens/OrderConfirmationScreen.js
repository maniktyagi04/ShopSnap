import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { Button } from '../components';
import { Ionicons } from '@expo/vector-icons';

const OrderConfirmationScreen = ({ navigation }) => {
    const handleContinueShopping = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'ProductList' }],
        });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark" size={64} color={COLORS.surface} />
                </View>

                <Text style={styles.title}>Order Placed!</Text>
                <Text style={styles.message}>
                    Your order has been successfully placed. We'll send you a confirmation email shortly.
                </Text>

                <Button
                    title="Continue Shopping"
                    onPress={handleContinueShopping}
                    style={styles.button}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: SPACING.xl,
        alignItems: 'center',
        width: '100%',
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: COLORS.success,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: SPACING.xl,
    },
    title: {
        fontSize: FONTS.size.xxl,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    message: {
        fontSize: FONTS.size.m,
        color: COLORS.textLight,
        textAlign: 'center',
        marginBottom: SPACING.xxl,
        lineHeight: 24,
    },
    button: {
        width: '100%',
    },
});

export default OrderConfirmationScreen;
