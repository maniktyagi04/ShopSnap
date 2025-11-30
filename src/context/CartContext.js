import React, { createContext, useReducer, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartContext = createContext();

const initialState = {
    items: [],
    total: 0,
};

const CART_STORAGE_KEY = '@ShopSnap:cart';

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'LOAD_CART':
            return action.payload;

        case 'ADD_TO_CART': {
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            let newItems;

            if (existingItemIndex >= 0) {
                newItems = [...state.items];
                newItems[existingItemIndex].quantity += 1;
            } else {
                newItems = [...state.items, { ...action.payload, quantity: 1 }];
            }

            return {
                ...state,
                items: newItems,
                total: calculateTotal(newItems),
            };
        }

        case 'REMOVE_FROM_CART': {
            const newItems = state.items.filter(item => item.id !== action.payload);
            return {
                ...state,
                items: newItems,
                total: calculateTotal(newItems),
            };
        }

        case 'UPDATE_QUANTITY': {
            const { id, quantity } = action.payload;
            if (quantity <= 0) {
                // Remove item if quantity is 0 or less
                const newItems = state.items.filter(item => item.id !== id);
                return {
                    ...state,
                    items: newItems,
                    total: calculateTotal(newItems),
                };
            }

            const newItems = state.items.map(item =>
                item.id === id ? { ...item, quantity } : item
            );

            return {
                ...state,
                items: newItems,
                total: calculateTotal(newItems),
            };
        }

        case 'CLEAR_CART':
            return initialState;

        default:
            return state;
    }
};

const calculateTotal = (items) => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from storage on mount
    useEffect(() => {
        const loadCart = async () => {
            try {
                const storedCart = await AsyncStorage.getItem(CART_STORAGE_KEY);
                if (storedCart) {
                    dispatch({ type: 'LOAD_CART', payload: JSON.parse(storedCart) });
                }
            } catch (error) {
                console.error('Failed to load cart:', error);
            }
        };
        loadCart();
    }, []);

    // Save cart to storage whenever it changes
    useEffect(() => {
        const saveCart = async () => {
            try {
                await AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
            } catch (error) {
                console.error('Failed to save cart:', error);
            }
        };
        saveCart();
    }, [state]);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    return (
        <CartContext.Provider
            value={{
                cart: state.items,
                total: state.total,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
