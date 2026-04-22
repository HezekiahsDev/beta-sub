import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Pressable, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { ActionChip } from "@/components/dashboard/ActionChip";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { ServiceTile } from "@/components/dashboard/ServiceTile";
import { TransactionRow } from "@/components/dashboard/TransactionRow";

const quickActions: Array<{
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
}> = [
  { icon: "rocket-outline", label: "Bonus" },
  { icon: "add", label: "Add Money" },
  { icon: "tennisball-outline", label: "Spin & Win" },
  { icon: "wallet-outline", label: "Wallet to Bank" },
];

const services: Array<{
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
}> = [
  { icon: "call-outline", label: "Airtime" },
  { icon: "phone-portrait-outline", label: "Data" },
  { icon: "tv-outline", label: "Cable" },
  { icon: "happy-outline", label: "Smile" },
  { icon: "flash-outline", label: "Electricity" },
  { icon: "school-outline", label: "Exams" },
  { icon: "arrow-up-outline", label: "Upgrade" },
  { icon: "storefront-outline", label: "Market" },
];

export default function TabOneScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-brand-700"
      edges={["top", "left", "right"]}
    >
      <StatusBar style="light" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="rounded-b-[26px] bg-brand-700 px-4 pb-6 pt-3">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="items-center justify-center w-12 h-12 mr-3 rounded-full bg-white/20">
                <Text className="text-base font-bold text-white">J</Text>
              </View>
              <View>
                <Text className="text-xs text-brand-200">Welcome Back!</Text>
                <Text className="text-2xl font-black text-white">Jiddah</Text>
              </View>
            </View>

            <View className="flex-row">
              <Link href="/modal" asChild>
                <Pressable className="items-center justify-center mr-2 border h-11 w-11 rounded-xl border-white/40 bg-white/10">
                  <Ionicons name="headset-outline" size={21} color="#ffffff" />
                </Pressable>
              </Link>
              <Link href="/modal" asChild>
                <Pressable className="items-center justify-center border h-11 w-11 rounded-xl border-white/40 bg-white/10">
                  <Ionicons
                    name="notifications-outline"
                    size={21}
                    color="#ffffff"
                  />
                </Pressable>
              </Link>
            </View>
          </View>

          <View className="p-2 mb-4 border rounded-xl border-white/20 bg-white/5">
            <Text className="text-sm text-brand-100">
              Welcome to Betasub enjoy great discount on all your purchases
            </Text>
          </View>

          <View className="flex-row items-start justify-between">
            <View>
              <Text className="text-brand-200">Wallet Balance</Text>
              <Text className="text-5xl font-bold text-white">₦0.00</Text>
              <Text className="text-lg font-medium text-brand-200">
                Bonus ₦0
              </Text>
            </View>

            <View className="items-end mt-5">
              <View className="px-2 py-1 mb-2 border rounded-lg border-white/30 bg-white/10">
                <Text className="font-semibold text-right text-white">
                  Palmpay Bank
                </Text>
                <Text className="text-xl font-bold leading-7 text-right text-white">
                  6623049721
                </Text>
              </View>
              <Ionicons name="eye-off-outline" size={20} color="#dbe4ff" />
            </View>
          </View>

          <View className="items-center mt-2">
            <Ionicons name="chevron-down" size={24} color="#dbe4ff" />
          </View>
        </View>

        <View className="-mt-6 rounded-t-[28px] bg-white px-4 pt-6 shadow-md">
          <View className="flex-row items-start justify-between mb-6">
            {quickActions.map((item) => (
              <ActionChip
                key={item.label}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </View>

          <View className="mb-6 overflow-hidden rounded-2xl bg-brand-700">
            <View className="px-4 py-4">
              <Text className="text-3xl font-black text-white">@ BETASUB</Text>
              <Text className="mt-1 text-lg font-extrabold text-white uppercase">
                We offer affordable smile bundles & instant top-up
              </Text>
              <Text className="mt-2 text-sm text-brand-100">
                Get fast, reliable, and budget-friendly smile data bundles with
                Betasub.
              </Text>
            </View>
            <View className="h-2 bg-brand-500" />
          </View>

          <SectionHeader title="Quick Services" actionLabel="See More" />
          <View className="px-1 py-3 mb-5 bg-white border rounded-3xl border-slate-200">
            <View className="flex-row flex-wrap justify-between">
              {services.map((item) => (
                <ServiceTile
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </View>
          </View>

          <SectionHeader title="Recent Transactions" actionLabel="View All" />
          <View className="pb-28">
            <TransactionRow
              icon="call-outline"
              title="You bought N7,000 airtime"
              amount="N7,000"
              date="8/11/2025 2:54AM"
              status="Successful"
            />
            <TransactionRow
              icon="tv-outline"
              title="You bought N22,000 DSTV subscription"
              amount="N22,000"
              date="8/11/2025 2:54AM"
              status="Pending"
            />
            <TransactionRow
              icon="flash-outline"
              title="You bought N15,000 electricity"
              amount="N15,000"
              date="8/11/2025 2:54AM"
              status="Successful"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
