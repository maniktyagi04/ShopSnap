import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { COLORS, SPACING, FONTS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const Input = ({
    placeholder,
    value,
    onChangeText,
    icon,
    secureTextEntry,
    keyboardType,
    label,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={styles.inputContainer}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={20}
                        color={COLORS.textLight}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={COLORS.textLight}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING.m,
    },
    label: {
        fontSize: FONTS.size.s,
        color: COLORS.text,
        marginBottom: SPACING.xs,
        fontWeight: '500',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        height: 50,
        paddingHorizontal: SPACING.m,
    },
    icon: {
        marginRight: SPACING.s,
    },
    input: {
        flex: 1,
        fontSize: FONTS.size.m,
        color: COLORS.text,
    },
});

export default Input;
