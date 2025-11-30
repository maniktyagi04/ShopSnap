import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS, SHADOWS } from '../constants/theme';
import { Button } from '../components';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

const SHIPPING_COST = 10.00;

const CartScreen = ({ navigation }) => {
    const { cart, total, updateQuantity, removeFromCart } = useCart();

    const finalTotal = total + (cart.length > 0 ? SHIPPING_COST : 0);

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />

            <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemVariant}>
                    {item.selectedSize} / {item.selectedColor}
                </Text>
                <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                        <Ionicons name="remove" size={16} color={COLORS.text} />
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        <Ionicons name="add" size={16} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}
            >
                <Ionicons name="trash-outline" size={20} color={COLORS.error} />
            </TouchableOpacity>
        </View>
    );

    if (cart.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Ionicons name="cart-outline" size={64} color={COLORS.textLight} />
                <Text style={styles.emptyText}>Your cart is empty</Text>
                <Button
                    title="Start Shopping"
                    onPress={() => navigation.navigate('ProductList')}
                    style={styles.shopButton}
                />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={cart}
                keyExtractor={item => `${item.id}-${item.selectedSize}-${item.selectedColor}`}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.footer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>₹{total.toLocaleString('en-IN')}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Shipping</Text>
                    <Text style={styles.summaryValue}>₹{SHIPPING_COST.toLocaleString('en-IN')}</Text>
                </View>
                <View style={[styles.summaryRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>₹{finalTotal.toLocaleString('en-IN')}</Text>
                </View>

                <Button
                    title="Checkout"
                    onPress={() => navigation.navigate('Checkout')}
                    style={styles.checkoutButton}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContent: {
        padding: SPACING.m,
        paddingBottom: 200,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: SPACING.m,
        marginBottom: SPACING.m,
        ...SHADOWS.small,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: COLORS.background,
    },
    itemDetails: {
        flex: 1,
        marginLeft: SPACING.m,
    },
    itemTitle: {
        fontSize: FONTS.size.m,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    itemVariant: {
        fontSize: FONTS.size.s,
        color: COLORS.textLight,
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: FONTS.size.m,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        marginHorizontal: SPACING.s,
        fontSize: FONTS.size.m,
        fontWeight: '600',
    },
    removeButton: {
        padding: SPACING.s,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: COLORS.surface,
        padding: SPACING.l,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingBottom: SPACING.xl,
        ...SHADOWS.medium,
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
        marginBottom: SPACING.l,
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
    checkoutButton: {
        width: '100%',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SPACING.xl,
    },
    emptyText: {
        fontSize: FONTS.size.l,
        color: COLORS.textLight,
        marginTop: SPACING.m,
        marginBottom: SPACING.xl,
    },
    shopButton: {
        width: 200,
    },
});

export default CartScreen;
