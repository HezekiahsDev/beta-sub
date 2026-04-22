import React from 'react';
import { type Href, useRouter } from 'expo-router';
import { Text, View, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFlow } from '@/providers/FlowProvider';

export default function TabTwoScreen() {
  const router = useRouter();
  const { signOut } = useFlow();
  const [isEnabled, setIsEnabled] = React.useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handleLogout = async () => {
    await signOut();
    router.replace('/login' as Href);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50 dark:bg-slate-950" edges={['left', 'right']}>
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        <View className="mb-8">
          <Text className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Settings
          </Text>
          <Text className="text-lg text-slate-500 dark:text-slate-400 mt-1">
            Manage your account preferences.
          </Text>
        </View>

        {/* Profile Card */}
        <View className="flex-row items-center bg-white dark:bg-slate-900 p-5 rounded-3xl mb-8 border border-slate-100 dark:border-slate-800">
          <View className="h-16 w-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full items-center justify-center mr-4">
            <Text className="text-indigo-600 dark:text-indigo-400 text-2xl font-bold">AB</Text>
          </View>
          <View className="flex-1">
            <Text className="text-xl font-bold text-slate-900 dark:text-white">Alex Bennett</Text>
            <Text className="text-slate-500 dark:text-slate-400">alex.b@example.com</Text>
          </View>
          <TouchableOpacity className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
            <Text className="text-slate-900 dark:text-white font-semibold text-xs">Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Settings Group */}
        <Text className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 px-1">Preferences</Text>
        
        <View className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 mb-8">
          <View className="flex-row items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800">
            <View className="flex-row items-center">
              <View className="h-8 w-8 bg-amber-100 dark:bg-amber-950 rounded-lg items-center justify-center mr-3">
                <View className="h-2 w-2 bg-amber-600 rounded-full" />
              </View>
              <Text className="text-slate-900 dark:text-white font-medium">Push Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: "#767577", true: "#6366f1" }}
              thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>

          <TouchableOpacity className="flex-row items-center justify-between p-4 border-b border-slate-50 dark:border-slate-800">
            <View className="flex-row items-center">
              <View className="h-8 w-8 bg-blue-100 dark:bg-blue-950 rounded-lg items-center justify-center mr-3">
                <View className="h-2 w-2 bg-blue-600 rounded-full" />
              </View>
              <Text className="text-slate-900 dark:text-white font-medium">Dark Mode</Text>
            </View>
            <Text className="text-slate-400 text-sm">System</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-row items-center justify-between p-4">
            <View className="flex-row items-center">
              <View className="h-8 w-8 bg-rose-100 dark:bg-rose-950 rounded-lg items-center justify-center mr-3">
                <View className="h-2 w-2 bg-rose-600 rounded-full" />
              </View>
              <Text className="text-slate-900 dark:text-white font-medium">Privacy Policy</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <TouchableOpacity
          className="bg-rose-50 dark:bg-rose-950/20 p-5 rounded-3xl items-center border border-rose-100 dark:border-rose-900/30"
          onPress={handleLogout}
        >
          <Text className="text-rose-600 dark:text-rose-400 font-bold">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
