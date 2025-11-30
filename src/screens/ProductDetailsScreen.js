import React, { useState, useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS, SHADOWS } from '../constants/theme';
import { Button, Badge } from '../components';
import { useCart } from '../context/CartContext';
import { Ionicons } from '@expo/vector-icons';

const SIZES = ['S', 'M', 'L', 'XL'];
const COLORS_VARIANTS = ['#000000', '#FFFFFF', '#FF0000', '#0000FF'];

const ProductDetailsScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const { addToCart, cart } = useCart();
    const [selectedSize, setSelectedSize] = useState('M');
    const [selectedColor, setSelectedColor] = useState(COLORS_VARIANTS[0]);

    const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    style={{ marginRight: SPACING.m }}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <Ionicons name="cart-outline" size={24} color={COLORS.text} />
                    <Badge count={cartItemCount} />
                </TouchableOpacity>
            ),
        });
    }, [navigation, cartItemCount]);

    const handleAddToCart = () => {
        addToCart({
            ...product,
            selectedSize,
            selectedColor,
        });
        // Optional: Show feedback
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.content}>
                    <View style={styles.headerRow}>
                        <Text style={styles.title}>{product.title}</Text>
                        <Text style={styles.price}>₹{product.price.toLocaleString('en-IN')}</Text>
                    </View>

                    <Text style={styles.description}>{product.description}</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Size</Text>
                        <View style={styles.optionsRow}>
                            {SIZES.map(size => (
                                <TouchableOpacity
                                    key={size}
                                    style={[
                                        styles.sizeOption,
                                        selectedSize === size && styles.sizeOptionActive
                                    ]}
                                    onPress={() => setSelectedSize(size)}
                                >
                                    <Text style={[
                                        styles.sizeText,
                                        selectedSize === size && styles.sizeTextActive
                                    ]}>{size}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Color</Text>
                        <View style={styles.optionsRow}>
                            {COLORS_VARIANTS.map(color => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorOption,
                                        { backgroundColor: color },
                                        selectedColor === color && styles.colorOptionActive
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                />
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <Button
                    title="Add to Cart"
                    onPress={handleAddToCart}
                    style={styles.addToCartButton}
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
    scrollContent: {
        paddingBottom: 100,
    },
    imageContainer: {
        width: '100%',
        height: 300,
        backgroundColor: COLORS.surface,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    content: {
        padding: SPACING.l,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: SPACING.m,
    },
    title: {
        fontSize: FONTS.size.xl,
        fontWeight: 'bold',
        color: COLORS.text,
        flex: 1,
        marginRight: SPACING.m,
    },
    price: {
        fontSize: FONTS.size.xl,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    description: {
        fontSize: FONTS.size.m,
        color: COLORS.textLight,
        lineHeight: 24,
        marginBottom: SPACING.l,
    },
    section: {
        marginBottom: SPACING.l,
    },
    sectionTitle: {
        fontSize: FONTS.size.m,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: SPACING.s,
    },
    optionsRow: {
        flexDirection: 'row',
    },
    sizeOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SPACING.m,
        backgroundColor: COLORS.surface,
    },
    sizeOptionActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    sizeText: {
        fontSize: FONTS.size.s,
        fontWeight: '600',
        color: COLORS.text,
    },
    sizeTextActive: {
        color: COLORS.surface,
    },
    colorOption: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        marginRight: SPACING.m,
        ...SHADOWS.small,
    },
    colorOptionActive: {
        borderWidth: 3,
        borderColor: COLORS.accent,
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
        paddingBottom: SPACING.xl, // For iPhone X+ home indicator
    },
    addToCartButton: {
        width: '100%',
    },
});

export default ProductDetailsScreen;
