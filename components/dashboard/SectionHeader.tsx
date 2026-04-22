import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type SectionHeaderProps = {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
};

export function SectionHeader({
  title,
  actionLabel,
  onActionPress,
}: SectionHeaderProps) {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-xl font-black text-slate-900">{title}</Text>
      {actionLabel ? (
        <TouchableOpacity
          onPress={onActionPress}
          className="flex-row items-center"
        >
          <Text className="text-sm font-semibold text-slate-800">
            {actionLabel}
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
