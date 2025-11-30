import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { Input, ProductCard, Badge } from '../components';
import productsData from '../data/products.json';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['All', 'Electronics', 'Accessories', 'Footwear'];

const Header = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => (
    <View style={styles.header}>
        <Text style={styles.heading}>Discover</Text>
        <Text style={styles.subheading}>Find your perfect item</Text>

        <Input
            placeholder="Search products..."
            icon="search"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchBar}
        />

        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
        >
            {CATEGORIES.map((category) => (
                <TouchableOpacity
                    key={category}
                    style={[
                        styles.categoryChip,
                        selectedCategory === category && styles.categoryChipActive
                    ]}
                    onPress={() => setSelectedCategory(category)}
                >
                    <Text style={[
                        styles.categoryText,
                        selectedCategory === category && styles.categoryTextActive
                    ]}>
                        {category}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </View>
);

const ProductListScreen = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredProducts, setFilteredProducts] = useState(productsData);
    const { cart, addToCart } = useCart();

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

    useEffect(() => {
        let result = productsData;

        if (selectedCategory !== 'All') {
            result = result.filter(item => item.category === selectedCategory);
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase().trim();
            result = result.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );
        }

        setFilteredProducts(result);
    }, [searchQuery, selectedCategory]);

    const getItemQuantity = (productId) => {
        const item = cart.find(i => i.id === productId);
        return item ? item.quantity : 0;
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <ProductCard
                        product={item}
                        quantity={getItemQuantity(item.id)}
                        onPress={() => navigation.navigate('ProductDetails', { product: item })}
                        onAddToCart={() => addToCart(item)}
                    />
                )}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <Header
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                    />
                }
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    listContent: {
        padding: SPACING.s,
    },
    header: {
        padding: SPACING.m,
        paddingBottom: SPACING.s,
    },
    heading: {
        fontSize: FONTS.size.xxl,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subheading: {
        fontSize: FONTS.size.m,
        color: COLORS.textLight,
        marginBottom: SPACING.l,
    },
    searchBar: {
        marginBottom: SPACING.l,
    },
    categoriesContainer: {
        paddingBottom: SPACING.m,
    },
    categoryChip: {
        paddingHorizontal: SPACING.l,
        paddingVertical: SPACING.s,
        borderRadius: 20,
        backgroundColor: COLORS.surface,
        marginRight: SPACING.s,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    categoryChipActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    categoryText: {
        fontSize: FONTS.size.s,
        fontWeight: '600',
        color: COLORS.textLight,
    },
    categoryTextActive: {
        color: COLORS.surface,
    },
});

export default ProductListScreen;
