import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabOneScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['left', 'right']}>
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <View className="mb-8">
          <Text className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </Text>
          <Text className="text-lg text-slate-500 dark:text-slate-400 mt-1">
            App analytics and overview.
          </Text>
        </View>

        {/* Feature Card */}
        <View className="bg-indigo-600 p-6 rounded-[32px] shadow-xl shadow-indigo-300 dark:shadow-none mb-8">
          <View className="flex-row justify-between items-start mb-4">
            <View>
              <Text className="text-indigo-100 text-sm font-medium uppercase tracking-widest">Active Credits</Text>
              <Text className="text-white text-4xl font-bold mt-1">$4,250.00</Text>
            </View>
            <View className="bg-indigo-500 p-2 rounded-2xl">
              <Text className="text-white text-xs font-bold">PRO</Text>
            </View>
          </View>
          <View className="h-[1px] bg-indigo-500/50 my-2" />
          <Text className="text-indigo-200 text-xs">Updated 2 minutes ago</Text>
        </View>

        {/* Stats Grid */}
        <View className="flex-row justify-between mb-8">
          <View className="w-[47%] bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
            <Text className="text-slate-400 text-xs font-bold uppercase mb-2">New users</Text>
            <Text className="text-2xl font-bold text-slate-900 dark:text-white">+248</Text>
            <View className="bg-emerald-100 dark:bg-emerald-950 self-start px-2 py-0.5 rounded-lg mt-2">
              <Text className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">+12%</Text>
            </View>
          </View>
          <View className="w-[47%] bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-100 dark:border-slate-800">
            <Text className="text-slate-400 text-xs font-bold uppercase mb-2">Revenue</Text>
            <Text className="text-2xl font-bold text-slate-900 dark:text-white">$12.4k</Text>
            <View className="bg-emerald-100 dark:bg-emerald-950 self-start px-2 py-0.5 rounded-lg mt-2">
              <Text className="text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">+8%</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <Text className="text-xl font-bold text-slate-900 dark:text-white mb-4 px-1">Recent Activity</Text>
        {[1, 2, 3].map((item) => (
          <View key={item} className="flex-row items-center bg-white dark:bg-slate-900 p-4 rounded-2xl mb-3 border border-slate-50 dark:border-slate-800">
            <View className="h-10 w-10 bg-slate-100 dark:bg-slate-800 rounded-full items-center justify-center mr-4">
              <View className="h-2 w-2 bg-indigo-600 rounded-full" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-900 dark:text-white font-semibold">Subscription Renewal</Text>
              <Text className="text-slate-400 text-xs">User #00{item} renewed for 1 year</Text>
            </View>
            <Text className="text-slate-900 dark:text-white font-bold">$99</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
