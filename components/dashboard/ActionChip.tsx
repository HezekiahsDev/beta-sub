import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type ActionChipProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
};

export function ActionChip({ icon, label }: ActionChipProps) {
  return (
    <TouchableOpacity className="w-[23%] items-center">
      <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
        <Ionicons name={icon} size={20} color="#1f2aba" />
      </View>
      <Text className="text-center text-xs font-medium text-slate-700">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
