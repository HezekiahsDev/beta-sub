import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

type ServiceTileProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  onPress?: () => void;
};

export function ServiceTile({ icon, label, onPress }: ServiceTileProps) {
  return (
    <TouchableOpacity onPress={onPress} className="w-1/4 items-center pb-3 pt-2">
      <View className="mb-2 h-10 w-10 items-center justify-center rounded-lg bg-white shadow-sm">
        <Ionicons name={icon} size={18} color="#1f2aba" />
      </View>
      <Text className="text-xs font-medium text-slate-700">{label}</Text>
    </TouchableOpacity>
  );
}
