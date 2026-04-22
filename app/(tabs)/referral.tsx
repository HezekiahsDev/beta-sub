import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ReferralScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-slate-100 px-4 dark:bg-slate-950"
      edges={["top", "left", "right"]}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="mt-2 text-4xl font-black text-slate-900 dark:text-white">
          Referral
        </Text>
        <Text className="mb-5 mt-1 text-sm text-slate-500 dark:text-slate-400">
          Invite your friends and earn rewards for every signup.
        </Text>

        <View className="mb-4 rounded-3xl bg-brand-700 p-5">
          <Text className="text-sm font-semibold text-brand-100">
            Referral Bonus
          </Text>
          <Text className="mt-1 text-5xl font-black text-white">N3,500</Text>
          <Text className="mt-2 text-sm text-brand-100">
            Share your code and get paid instantly when a friend transacts.
          </Text>
        </View>

        <View className="mb-4 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <Text className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Your code
          </Text>
          <View className="mt-2 flex-row items-center justify-between rounded-2xl bg-slate-100 px-4 py-3 dark:bg-slate-800">
            <Text className="text-xl font-black tracking-[2px] text-brand-700 dark:text-brand-300">
              BETA-JID-44
            </Text>
            <Ionicons name="copy-outline" size={20} color="#1f2aba" />
          </View>
        </View>

        <TouchableOpacity className="mb-3 items-center rounded-2xl bg-brand-700 py-4">
          <Text className="text-base font-bold text-white">
            Share Invite Link
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center rounded-2xl border border-brand-700 py-4">
          <Text className="text-base font-bold text-brand-700 dark:text-brand-300">
            View Referral History
          </Text>
        </TouchableOpacity>

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}
