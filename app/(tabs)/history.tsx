import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const historyItems = [
  {
    title: "Airtime top-up",
    amount: "N7,000",
    date: "Today, 2:54AM",
    status: "Successful",
  },
  {
    title: "DSTV subscription",
    amount: "N22,000",
    date: "Yesterday, 10:22PM",
    status: "Pending",
  },
  {
    title: "Electricity token",
    amount: "N15,000",
    date: "Yesterday, 8:10PM",
    status: "Successful",
  },
  {
    title: "Smile data",
    amount: "N5,000",
    date: "Mon, 4:18PM",
    status: "Successful",
  },
];

export default function HistoryScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-slate-100 px-4 dark:bg-slate-950"
      edges={["top", "left", "right"]}
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <Text className="mt-2 text-4xl font-black text-slate-900 dark:text-white">
          History
        </Text>
        <Text className="mb-5 mt-1 text-sm text-slate-500 dark:text-slate-400">
          Track your recent activities and payment records.
        </Text>

        {historyItems.map((item) => (
          <View
            key={`${item.title}-${item.date}`}
            className="mb-3 rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
          >
            <View className="mb-2 flex-row items-center justify-between">
              <View className="flex-row items-center">
                <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-brand-700">
                  <Ionicons name="time-outline" size={18} color="#ffffff" />
                </View>
                <Text className="text-sm font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </Text>
              </View>
              <Text className="text-sm font-bold text-slate-900 dark:text-white">
                {item.amount}
              </Text>
            </View>
            <View className="flex-row items-center justify-between">
              <Text className="text-xs text-slate-500 dark:text-slate-400">
                {item.date}
              </Text>
              <Text
                className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${item.status === "Successful" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"}`}
              >
                {item.status}
              </Text>
            </View>
          </View>
        ))}

        <View className="h-24" />
      </ScrollView>
    </SafeAreaView>
  );
}
