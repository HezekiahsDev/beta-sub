import React from 'react';
import { Pressable, Text } from 'react-native';

type AuthButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'ghost';
};

export function AuthButton({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
}: AuthButtonProps) {
  const primary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      className={`h-14 items-center justify-center rounded-2xl ${
        primary
          ? disabled
            ? 'bg-indigo-300'
            : 'bg-indigo-800'
          : 'bg-transparent border border-indigo-800'
      }`}
    >
      <Text
        className={`text-2xl font-semibold ${primary ? 'text-white' : 'text-indigo-800'} ${
          disabled ? 'opacity-70' : 'opacity-100'
        }`}
      >
        {label}
      </Text>
    </Pressable>
  );
}
