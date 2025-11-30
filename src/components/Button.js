import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { COLORS, SPACING, FONTS } from '../constants/theme';

const Button = ({
    title,
    onPress,
    variant = 'primary',
    loading = false,
    disabled = false,
    style
}) => {
    const isPrimary = variant === 'primary';
    const backgroundColor = disabled
        ? COLORS.textLight
        : isPrimary
            ? COLORS.primary
            : 'transparent';

    const textColor = isPrimary ? COLORS.surface : COLORS.primary;
    const border = isPrimary ? null : { borderWidth: 1, borderColor: COLORS.primary };

    return (
        <TouchableOpacity
            style={[
                styles.container,
                { backgroundColor },
                border,
                style,
            ]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={textColor} />
            ) : (
                <Text style={[styles.text, { color: textColor }]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: SPACING.l,
    },
    text: {
        fontSize: FONTS.size.m,
        fontWeight: '600',
    },
});

export default Button;
