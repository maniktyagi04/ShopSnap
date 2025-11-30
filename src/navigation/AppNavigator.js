import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
    ProductListScreen,
    ProductDetailsScreen,
    CartScreen,
    CheckoutScreen,
    OrderConfirmationScreen,
} from '../screens';
import { COLORS } from '../constants/theme';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();

const MainStack = () => (
    <Stack.Navigator
        screenOptions={{
            headerStyle: {
                backgroundColor: COLORS.surface,
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: COLORS.border,
            },
            headerTintColor: COLORS.text,
            headerTitleStyle: {
                fontWeight: '600',
            },
            headerBackTitleVisible: false,
            cardStyle: { backgroundColor: COLORS.background },
        }}
    >
        <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={{ title: 'ShopSnap' }}
        />
        <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ title: 'Details' }}
        />
        <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: 'My Cart' }}
        />
        <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{ title: 'Checkout' }}
        />
        <Stack.Screen
            name="OrderConfirmation"
            component={OrderConfirmationScreen}
            options={{ title: 'Order Confirmed', gestureEnabled: false, headerLeft: null }}
        />
    </Stack.Navigator>
);

const AppNavigator = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <NavigationContainer>
            {isAuthenticated ? (
                <MainStack />
            ) : (
                <AuthNavigator onLogin={handleLogin} />
            )}
        </NavigationContainer>
    );
};

export default AppNavigator;
