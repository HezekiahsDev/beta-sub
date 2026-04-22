import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

interface AppHeaderProps {
  title: string;
  showBack?: boolean;
}

export function AppHeader({ title, showBack = true }: AppHeaderProps) {
  const router = useRouter();

  return (
    <View className="bg-brand-700 pb-6 pt-2 rounded-b-[24px]">
      <SafeAreaView edges={["top"]} />
      <View className="flex-row items-center px-4">
        {showBack && (
          <TouchableOpacity
            onPress={() => router.back()}
            className="h-10 w-10 items-center justify-center rounded-xl bg-white/20 border border-white/30 mr-4"
          >
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
        )}
        <View className="flex-1">
          <Text className="text-2xl font-black text-white">{title}</Text>
        </View>
        <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-xl bg-white/20 border border-white/30">
          <Ionicons name="help-circle-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
