import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, FONTS, SPACING, SHADOWS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const ProductCard = ({ product, onPress, onAddToCart, quantity = 0 }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={onPress}
            activeOpacity={0.9}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: product.image }}
                    style={styles.image}
                    resizeMode="cover"
                />
                {quantity > 0 && (
                    <View style={styles.quantityBadge}>
                        <Text style={styles.quantityText}>{quantity}</Text>
                    </View>
                )}
            </View>

            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
                <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>

                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onAddToCart}
                >
                    <Ionicons name="add" size={20} color={COLORS.surface} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.cardBackground,
        borderRadius: 16,
        margin: SPACING.s,
        ...SHADOWS.medium,
        overflow: 'hidden',
    },
    imageContainer: {
        height: 160,
        width: '100%',
        backgroundColor: COLORS.background,
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    quantityBadge: {
        position: 'absolute',
        top: SPACING.s,
        right: SPACING.s,
        backgroundColor: COLORS.accent,
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
    },
    quantityText: {
        color: COLORS.surface,
        fontSize: 12,
        fontWeight: 'bold',
    },
    content: {
        padding: SPACING.m,
    },
    title: {
        fontSize: FONTS.size.s,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.xs,
    },
    price: {
        fontSize: FONTS.size.m,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    addButton: {
        position: 'absolute',
        bottom: SPACING.m,
        right: SPACING.m,
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        ...SHADOWS.small,
    },
});

export default ProductCard;
