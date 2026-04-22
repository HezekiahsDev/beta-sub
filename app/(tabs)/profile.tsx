import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const profileOptions = [
  {
    icon: "rocket",
    label: "Upgrade Account",
    color: "#1f2aba",
    href: "/modal",
  },
  {
    icon: "people",
    label: "Refer a Friend",
    color: "#1f2aba",
    href: "/referral",
  },
  {
    icon: "settings",
    label: "Change Pin",
    color: "#1f2aba",
    href: "/modal",
  },
  {
    icon: "person",
    label: "Complete your KYC",
    color: "#1f2aba",
    href: "/modal",
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header with Edit Icon */}
        <View className="flex-row justify-end px-6 pt-4">
          <TouchableOpacity>
            <Ionicons name="pencil-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Profile Info Section */}
        <View className="items-center px-6 mt-2 mb-8">
          <View className="relative">
            <View className="overflow-hidden border-4 border-slate-100 rounded-full w-28 h-28">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
                }}
                className="w-full h-full"
              />
            </View>
            <TouchableOpacity
              className="absolute bottom-0 right-0 items-center justify-center w-10 h-10 bg-white border-4 border-white shadow-sm rounded-full"
              style={{ elevation: 2 }}
            >
              <View className="items-center justify-center w-8 h-8 rounded-full bg-slate-200">
                <Ionicons name="camera" size={16} color="#000" />
              </View>
            </TouchableOpacity>
          </View>

          <Text className="mt-4 text-2xl font-black text-slate-900">
            Hezekiahs
          </Text>
          <Text className="text-sm font-medium text-slate-600">
            Hezekiahs@gmail.com
          </Text>
          <Text className="text-sm font-medium text-slate-600">
            +234(080)56467575
          </Text>
        </View>

        {/* Options List */}
        <View className="px-5 space-y-4">
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center justify-between p-4 mb-3 border rounded-2xl border-slate-200"
            >
              <View className="flex-row items-center">
                <View
                  className="items-center justify-center w-10 h-10 mr-3 rounded-full"
                  style={{ backgroundColor: option.color + "15" }}
                >
                  <Ionicons
                    name={option.icon as any}
                    size={20}
                    color={option.color}
                  />
                </View>
                <Text className="text-base font-semibold text-slate-800">
                  {option.label}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={option.color} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Log Out Button */}
        <View className="px-5 mt-10 mb-32">
          <TouchableOpacity className="items-center justify-center py-4 bg-brand-700 rounded-2xl">
            <Text className="text-lg font-bold text-white">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
