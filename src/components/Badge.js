import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SPACING } from '../constants/theme';

const Badge = ({ count, style }) => {
    if (!count || count <= 0) return null;

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.text}>
                {count > 99 ? '99+' : count}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: COLORS.error,
        borderRadius: 10,
        minWidth: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,
        zIndex: 1,
    },
    text: {
        color: COLORS.surface,
        fontSize: 10,
        fontWeight: 'bold',
    },
});

export default Badge;
