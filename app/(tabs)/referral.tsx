import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function ReferralScreen() {
  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top", "left", "right"]}
    >
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center px-6 pt-4 mb-6">
          <Text className="text-2xl font-black text-slate-900">Refer & Earn</Text>
        </View>

        {/* Info Cards */}
        <View className="px-5 space-y-4">
          {/* Bonus Earned */}
          <View className="flex-row items-center p-4 mb-4 border rounded-2xl border-slate-200">
            <View className="items-center justify-center w-12 h-12 mr-4 bg-brand-50 rounded-2xl">
              <Ionicons name="rocket-outline" size={24} color="#1f2aba" />
            </View>
            <View>
              <Text className="text-sm font-semibold text-slate-800">
                Bonus Earned
              </Text>
              <Text className="text-xl font-bold text-slate-900">₦0</Text>
              <Text className="text-xs text-slate-500">
                Total bonus from referrals
              </Text>
            </View>
          </View>

          {/* Invitation Code */}
          <View className="flex-row items-center p-4 mb-4 border rounded-2xl border-slate-200">
            <View className="items-center justify-center w-12 h-12 mr-4 bg-brand-50 rounded-2xl">
              <Ionicons name="qr-code-outline" size={24} color="#1f2aba" />
            </View>
            <View>
              <Text className="text-sm font-semibold text-slate-800">
                Your Invitation Code
              </Text>
              <Text className="text-xl font-bold text-slate-900">
                08061111247
              </Text>
              <Text className="text-xs text-slate-500">
                Share this code with friends
              </Text>
            </View>
          </View>

          {/* Referred Users */}
          <View className="flex-row items-center p-4 mb-6 border rounded-2xl border-slate-200">
            <View className="items-center justify-center w-12 h-12 mr-4 bg-brand-50 rounded-2xl">
              <Ionicons name="people-outline" size={24} color="#1f2aba" />
            </View>
            <View>
              <Text className="text-sm font-semibold text-slate-800">
                Referred Users
              </Text>
              <Text className="text-xl font-bold text-slate-900">Users</Text>
              <Text className="text-xs text-slate-500">
                Accepted your invitation
              </Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="px-5 mb-6">
          <TouchableOpacity className="flex-row items-center justify-center py-4 mb-4 bg-brand-700 rounded-2xl">
            <Ionicons
              name="share-social-outline"
              size={20}
              color="#fff"
              className="mr-2"
            />
            <Text className="text-lg font-bold text-white">Invite Friends</Text>
          </TouchableOpacity>

          <View className="flex-row justify-between">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-4 mr-2 border border-slate-200 rounded-2xl">
              <Ionicons
                name="copy-outline"
                size={20}
                color="#000"
                className="mr-2"
              />
              <Text className="font-bold text-slate-900">Copy Code</Text>
            </TouchableOpacity>
            <TouchableOpacity className="flex-1 flex-row items-center justify-center py-4 ml-2 border border-slate-200 rounded-2xl">
              <Ionicons
                name="link-outline"
                size={20}
                color="#000"
                className="mr-2"
              />
              <Text className="font-bold text-slate-900">Copy Link</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* How it works */}
        <View className="mx-5 mb-32 p-6 bg-brand-700 rounded-[32px]">
          <Text className="text-xl font-bold text-white mb-6">How it works</Text>
          
          <View className="space-y-6">
            <View className="flex-row items-start mb-6">
              <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center mr-4">
                <View className="w-6 h-6 rounded-full bg-white/40" />
              </View>
              <View>
                <Text className="text-white font-bold">Share your code</Text>
                <Text className="text-brand-100 text-xs">
                  Send your referral code to friends
                </Text>
              </View>
            </View>

            <View className="flex-row items-start mb-6">
              <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center mr-4">
                <View className="w-6 h-6 rounded-full bg-white/40" />
              </View>
              <View>
                <Text className="text-white font-bold">Friends sign up</Text>
                <Text className="text-brand-100 text-xs">
                  They use your code when registering
                </Text>
              </View>
            </View>

            <View className="flex-row items-start">
              <View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center mr-4">
                <View className="w-6 h-6 rounded-full bg-white/40" />
              </View>
              <View>
                <Text className="text-white font-bold">Earn rewards</Text>
                <Text className="text-brand-100 text-xs">
                  Get paid for every successful transaction
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
