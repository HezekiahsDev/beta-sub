import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Modal } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "@/components/AppHeader";
import {
  SpinningWheel,
  SPIN_REWARDS,
  SpinReward,
} from "@/components/spin/SpinningWheel";
import { AuthButton } from "@/components/auth/AuthButton";

export default function SpinScreen() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [reward, setReward] = useState<SpinReward | null>(null);
  const [spinsLeft, setSpinsLeft] = useState(3);

  const handleSpin = () => {
    if (spinsLeft <= 0 || spinning) return;
    setSpinning(true);
    setSpinsLeft((prev) => prev - 1);
  };

  const onFinished = (reward: SpinReward) => {
    setSpinning(false);
    setReward(reward);
    setShowResult(true);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Spin & Win" showBack={true} />

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Daily Progress */}
        <View className="px-6 pt-6">
          <View className="bg-slate-900 p-6 rounded-[32px] flex-row justify-between items-center shadow-xl">
            <View>
              <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                Today's Remaining
              </Text>
              <Text className="text-white text-3xl font-black">
                {spinsLeft} Spins
              </Text>
            </View>
            <View className="w-14 h-14 bg-brand-500 rounded-2xl items-center justify-center border border-brand-400 shadow-lg shadow-brand-500/50">
              <Ionicons name="gift" size={28} color="#ffffff" />
            </View>
          </View>
        </View>

        <SpinningWheel spinning={spinning} onFinished={onFinished} />

        <View className="px-6 mb-10">
          <AuthButton
            label={spinning ? "SPINNING..." : "SPIN NOW"}
            onPress={handleSpin}
            disabled={spinning || spinsLeft <= 0}
          />
          {spinsLeft <= 0 && (
            <Text className="text-center text-slate-400 mt-4 font-medium">
              You've reached your daily limit. Come back tomorrow!
            </Text>
          )}
        </View>

        {/* Previous Winners */}
        <View className="px-6 mb-20">
          <Text className="text-lg font-black text-slate-900 mb-4">
            Recent Winners
          </Text>
          {[
            { name: "Ahmed K.", win: "N500 Cash", time: "2 mins ago" },
            { name: "Blessing O.", win: "1GB Data", time: "5 mins ago" },
            { name: "Musa Y.", win: "N100 Airtime", time: "10 mins ago" },
          ].map((winner, idx) => (
            <View
              key={idx}
              className="flex-row items-center justify-between p-4 bg-slate-50 rounded-2xl mb-3 border border-slate-100"
            >
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-brand-100 rounded-full items-center justify-center mr-3">
                  <Text className="text-brand-700 font-black">
                    {winner.name[0]}
                  </Text>
                </View>
                <View>
                  <Text className="text-slate-900 font-bold">
                    {winner.name}
                  </Text>
                  <Text className="text-brand-600 font-bold text-xs">
                    {winner.win}
                  </Text>
                </View>
              </View>
              <Text className="text-slate-400 text-xs font-medium">
                {winner.time}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Result Modal */}
      <Modal visible={showResult} transparent animationType="fade">
        <View className="flex-1 bg-slate-900/90 items-center justify-center px-6">
          <View className="bg-white w-full rounded-[40px] p-8 items-center border-4 border-brand-500 shadow-2xl">
            <View
              className={`w-24 h-24 rounded-full items-center justify-center mb-6 shadow-lg ${
                reward?.type === "lose"
                  ? "bg-slate-100"
                  : "bg-brand-500 shadow-brand-500/50"
              }`}
            >
              <Ionicons
                name={reward?.type === "lose" ? "sad-outline" : "trophy"}
                size={48}
                color={reward?.type === "lose" ? "#64748b" : "#ffffff"}
              />
            </View>

            <Text className="text-3xl font-black text-slate-900 text-center mb-2">
              {reward?.type === "lose"
                ? "Better luck next time!"
                : "Congratulations!"}
            </Text>

            {reward?.type !== "lose" && (
              <Text className="text-slate-500 font-medium text-center mb-1">
                You've won
              </Text>
            )}

            {reward?.type !== "lose" && (
              <Text className="text-4xl font-black text-brand-700 mb-6 text-center">
                {reward?.value}
              </Text>
            )}

            <View className="w-full mt-4">
              <AuthButton
                label={reward?.type === "lose" ? "COOL" : "CLAIM REWARD"}
                onPress={() => setShowResult(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
