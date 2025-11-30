import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, SignUpScreen } from '../screens';
import { COLORS } from '../constants/theme';

const Stack = createStackNavigator();

const AuthNavigator = ({ onLogin }) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: COLORS.background },
            }}
        >
            <Stack.Screen name="Login">
                {props => <LoginScreen {...props} onLogin={onLogin} />}
            </Stack.Screen>
            <Stack.Screen name="SignUp">
                {props => <SignUpScreen {...props} onLogin={onLogin} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthNavigator;
