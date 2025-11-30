import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Alert,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { Input, Button } from '../components';
import { useCart } from '../context/CartContext';

const CheckoutScreen = ({ navigation }) => {
    const { cart, total, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        phone: '',
    });

    const handleInputChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handlePlaceOrder = async () => {

        if (!form.name || !form.email || !form.address || !form.phone) {
            Alert.alert('Error', 'Please fill in all required fields');
            return;
        }

        setLoading(true);


        setTimeout(() => {
            setLoading(false);
            clearCart();
            navigation.reset({
                index: 0,
                routes: [{ name: 'OrderConfirmation' }],
            });
        }, 2000);
    };

    const shippingCost = 10.00;
    const finalTotal = total + shippingCost;

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Shipping Information</Text>

                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={form.name}
                            onChangeText={(text) => handleInputChange('name', text)}
                        />

                        <Input
                            label="Email"
                            placeholder="john@example.com"
                            keyboardType="email-address"
                            value={form.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                        />

                        <Input
                            label="Phone"
                            placeholder="+1 234 567 8900"
                            keyboardType="phone-pad"
                            value={form.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                        />

                        <Input
                            label="Address"
                            placeholder="123 Main St"
                            value={form.address}
                            onChangeText={(text) => handleInputChange('address', text)}
                        />

                        <View style={styles.row}>
                            <Input
                                label="City"
                                placeholder="New York"
                                style={{ flex: 1, marginRight: SPACING.s }}
                                value={form.city}
                                onChangeText={(text) => handleInputChange('city', text)}
                            />
                            <Input
                                label="ZIP Code"
                                placeholder="10001"
                                keyboardType="numeric"
                                style={{ flex: 1, marginLeft: SPACING.s }}
                                value={form.zip}
                                onChangeText={(text) => handleInputChange('zip', text)}
                            />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Order Summary</Text>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Items ({cart.length})</Text>
                            <Text style={styles.summaryValue}>₹{total.toLocaleString('en-IN')}</Text>
                        </View>
                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>Shipping</Text>
                            <Text style={styles.summaryValue}>₹{shippingCost.toLocaleString('en-IN')}</Text>
                        </View>
                        <View style={[styles.summaryRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>Total</Text>
                            <Text style={styles.totalValue}>₹{finalTotal.toLocaleString('en-IN')}</Text>
                        </View>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <Button
                        title={`Place Order - ₹${finalTotal.toLocaleString('en-IN')}`}
                        onPress={handlePlaceOrder}
                        loading={loading}
                    />
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
    scrollContent: {
        padding: SPACING.m,
        paddingBottom: 100,
    },
    section: {
        marginBottom: SPACING.xl,
    },
    sectionTitle: {
        fontSize: FONTS.size.l,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: SPACING.m,
    },
    row: {
        flexDirection: 'row',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SPACING.s,
    },
    summaryLabel: {
        fontSize: FONTS.size.m,
        color: COLORS.textLight,
    },
    summaryValue: {
        fontSize: FONTS.size.m,
        fontWeight: '600',
        color: COLORS.text,
    },
    totalRow: {
        marginTop: SPACING.s,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: SPACING.s,
    },
    totalLabel: {
        fontSize: FONTS.size.l,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    totalValue: {
        fontSize: FONTS.size.l,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    footer: {
        padding: SPACING.l,
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: SPACING.xl,
    },
});

export default CheckoutScreen;
