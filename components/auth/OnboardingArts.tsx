import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type OnboardingArtsProps = {
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  caption: string;
};

export function OnboardingArts({ iconName, caption }: OnboardingArtsProps) {
  return (
    <View className="items-center justify-center">
      <View className="h-72 w-72 items-center justify-center rounded-[48px] bg-transparent">
        <Ionicons name={iconName} size={240} color="#2E2AA5" />
      </View>
      <Text className="mt-4 text-sm text-slate-500">{caption}</Text>
    </View>
  );
}
