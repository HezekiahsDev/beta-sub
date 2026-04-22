import React from "react";
import { KeyboardTypeOptions, Text, TextInput, View } from "react-native";

type AuthInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  rightAdornment?: React.ReactNode;
  error?: string;
  maxLength?: number;
};

export function AuthInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType,
  autoCapitalize = "none",
  rightAdornment,
  error,
  maxLength,
}: AuthInputProps) {
  return (
    <View className="mb-4">
      <Text className="mb-2 text-xl font-medium text-slate-900">{label}</Text>
      <View className="h-14 flex-row items-center rounded-xl border border-indigo-700 px-3">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#C8C8C8"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          className="flex-1 text-xl text-slate-900"
        />
        {rightAdornment}
      </View>
      {error ? (
        <Text className="mt-1 text-base text-rose-600">{error}</Text>
      ) : null}
    </View>
  );
}
