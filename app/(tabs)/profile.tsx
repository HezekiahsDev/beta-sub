import React from "react";
import { type Href, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useFlow } from "@/providers/FlowProvider";

const profileActions = [
  { icon: "person-outline", label: "Account Details" },
  { icon: "shield-checkmark-outline", label: "Security" },
  { icon: "help-circle-outline", label: "Help Center" },
  { icon: "document-text-outline", label: "Terms & Privacy" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { signOut } = useFlow();

  const handleLogout = async () => {
    await signOut();
    router.replace("/login" as Href);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-slate-100 px-4 dark:bg-slate-950"
      edges={["top", "left", "right"]}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="mt-2 text-4xl font-black text-slate-900 dark:text-white">
          Profile
        </Text>

        <View className="mb-5 mt-4 flex-row items-center rounded-3xl bg-brand-700 p-5">
          <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-white/20">
            <Text className="text-2xl font-black text-white">J</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xl font-black text-white">Jiddah Ahmadu</Text>
            <Text className="text-sm text-brand-100">jiddah@betasub.app</Text>
          </View>
        </View>

        <View className="rounded-3xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900">
          {profileActions.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              className={`flex-row items-center justify-between px-2 py-3 ${index < profileActions.length - 1 ? "border-b border-slate-200 dark:border-slate-800" : ""}`}
            >
              <View className="flex-row items-center">
                <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <Ionicons
                    name={
                      item.icon as React.ComponentProps<typeof Ionicons>["name"]
                    }
                    size={18}
                    color="#1f2aba"
                  />
                </View>
                <Text className="text-sm font-semibold text-slate-900 dark:text-white">
                  {item.label}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color="#64748b" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          className="mb-24 mt-5 items-center rounded-2xl border border-rose-200 bg-rose-50 py-4 dark:border-rose-900/40 dark:bg-rose-900/20"
          onPress={handleLogout}
        >
          <Text className="text-base font-bold text-rose-600 dark:text-rose-400">
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
