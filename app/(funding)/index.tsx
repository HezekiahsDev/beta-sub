import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { AppHeader } from "@/components/AppHeader";

const VIRTUAL_ACCOUNTS = [
  { bank: "Palmpay", number: "6623049721", name: "BETASUB - Hezekiahs Adeniye" },
  { bank: "Wema Bank", number: "8821903342", name: "BETASUB - Hezekiahs Adeniye" },
  { bank: "Moniepoint", number: "5534129087", name: "BETASUB - Hezekiahs Adeniye" },
];

export default function FundingScreen() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    await Clipboard.setStringAsync(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Add Money" showBack={true} />
      
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
          <Text className="text-slate-500 font-medium mb-6">
            Fund your wallet instantly via bank transfer to any of your personalized virtual accounts below.
          </Text>

          <View className="space-y-4">
            {VIRTUAL_ACCOUNTS.map((account, index) => (
              <View key={index} className="p-5 border border-slate-100 bg-slate-50/50 rounded-3xl mb-4 shadow-sm">
                <View className="flex-row justify-between items-start mb-3">
                  <View>
                    <Text className="text-brand-500 text-[10px] font-black uppercase tracking-widest mb-1">{account.bank}</Text>
                    <Text className="text-2xl font-black text-slate-900 tracking-tight">{account.number}</Text>
                  </View>
                  <TouchableOpacity 
                    onPress={() => copyToClipboard(account.number, index)}
                    className={`h-10 w-10 items-center justify-center rounded-xl ${copiedIndex === index ? 'bg-green-100' : 'bg-brand-100'}`}
                  >
                    <Ionicons 
                      name={copiedIndex === index ? "checkmark" : "copy-outline"} 
                      size={20} 
                      color={copiedIndex === index ? "#16a34a" : "#3b5df5"} 
                    />
                  </TouchableOpacity>
                </View>
                
                <View className="h-[1px] bg-slate-100 mb-3" />
                
                <View>
                  <Text className="text-slate-400 text-[10px] font-bold uppercase mb-1">Account Name</Text>
                  <Text className="text-slate-700 font-bold">{account.name}</Text>
                </View>
              </View>
            ))}
          </View>

          <View className="mt-4 p-5 bg-brand-700 rounded-3xl overflow-hidden">
            <View className="flex-row items-center mb-3">
              <View className="h-10 w-10 rounded-full bg-white/20 items-center justify-center mr-3">
                <Ionicons name="card-outline" size={20} color="white" />
              </View>
              <Text className="text-white font-bold text-lg">Pay with Card</Text>
            </View>
            <Text className="text-brand-100 text-sm mb-4">
              Coming soon! You will be able to fund your wallet directly with your debit card.
            </Text>
            <TouchableOpacity className="bg-white/20 py-3 rounded-xl items-center border border-white/30">
              <Text className="text-white font-bold">Notify Me</Text>
            </TouchableOpacity>
          </View>
          
          <View className="mt-8 mb-20 bg-slate-50 p-5 rounded-3xl">
             <View className="flex-row items-center mb-2">
                <Ionicons name="information-circle-outline" size={18} color="#64748b" />
                <Text className="ml-2 font-bold text-slate-600">Important Note</Text>
             </View>
             <Text className="text-slate-500 text-xs leading-5">
                • Minimum funding amount is ₦100.{"\n"}
                • Bank transfer funding typically reflects within 1-2 minutes.{"\n"}
                • Contact support if your wallet is not credited after 30 minutes.
             </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
