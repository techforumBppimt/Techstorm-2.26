import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  Platform,
} from 'react-native';
import { colors } from '../../theme/colors';
import { typography } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

type PrimaryButtonProps = {
  title: string;
  onPress?: () => void;
  size?: 'small' | 'medium' | 'large';
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  accessibilityLabel?: string;
};

export default function PrimaryButton({
  title,
  onPress,
  size = 'medium',
  style,
  textStyle,
  disabled = false,
  accessibilityLabel,
}: PrimaryButtonProps) {
  const sizeStyles = sizeMap[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        sizeStyles.button,
        disabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
    >
      <Text style={[styles.text, sizeStyles.text, disabled && styles.disabledText, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const sizeMap = {
  small: {
    button: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg },
    text: { fontSize: 10 },
  },
  medium: {
    button: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl },
    text: { fontSize: 12 },
  },
  large: {
    button: { paddingVertical: spacing.md + 4, paddingHorizontal: spacing.xl },
    text: { fontSize: 14 },
  },
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.buttonPrimaryBg,
    borderWidth: 4,
    borderColor: colors.buttonPrimaryBorder,
    ...Platform.select({
      ios: {
        shadowColor: colors.buttonPrimaryShadow,
        shadowOffset: { width: 4, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 0,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  text: {
    fontFamily: typography.fontFamily.bodyBold,
    fontWeight: '700',
    color: colors.buttonPrimaryBorder,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.textMuted,
  },
});
