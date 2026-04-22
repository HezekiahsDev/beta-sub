import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { AuthButton } from "@/components/auth/AuthButton";
import { Ionicons } from "@expo/vector-icons";
import ReceiptModal from "../history/ReceiptModal";
import { PinModal } from "@/components/PinModal";

interface Tier {
  id: string;
  name: string;
  price: string;
  benefits: string[];
  color: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}

const TIERS: Tier[] = [
  {
    id: "api",
    name: "API User",
    price: "N1,000",
    icon: "code-working",
    color: "#1f2aba",
    benefits: [
      "Access to API documentation",
      "Higher discounts on all services",
      "Priority customer support",
      "Automated transaction system",
    ],
  },
  {
    id: "reseller",
    name: "Reseller",
    price: "N5,000",
    icon: "briefcase",
    color: "#7c3aed",
    benefits: [
      "Wholesale pricing on all bundles",
      "Custom branding options",
      "Sub-reseller management",
      "VIP dedicated account manager",
      "Highest possible discounts",
    ],
  },
];

export default function UpgradeScreen() {
  const [selectedTierId, setSelectedTierId] = useState<string | null>(null);
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const selectedTier = TIERS.find((t) => t.id === selectedTierId);

  const handleUpgrade = () => {
    setShowPin(true);
  };

  const handlePinSuccess = (pin: string) => {
    setShowPin(false);
    const mockTx = {
      id: "up-" + Math.random().toString(36).substr(2, 9),
      icon: "arrow-up" as const,
      title: `Account Upgrade - ${selectedTier?.name}`,
      amount: selectedTier?.price || "N0",
      date: new Date().toISOString(),
      status: "Successful" as const,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Account Upgrade" />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <View className="p-6 bg-slate-900 rounded-[32px] mb-8 shadow-xl">
            <View className="flex-row justify-between items-center mb-4">
                <View>
                    <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Current Status</Text>
                    <Text className="text-white text-2xl font-black">Smart User</Text>
                </View>
                <View className="w-12 h-12 bg-white/10 rounded-2xl items-center justify-center border border-white/20">
                    <Ionicons name="person" size={24} color="#ffffff" />
                </View>
            </View>
            <View className="h-1 bg-white/10 rounded-full overflow-hidden">
                <View className="h-full w-1/3 bg-brand-500 rounded-full" />
            </View>
            <Text className="text-brand-300 mt-3 text-xs font-medium">Upgrade to access more discounts and features</Text>
        </View>

        <Text className="text-lg font-bold text-slate-800 mb-4">Select Upgrade Tier</Text>
        
        {TIERS.map((tier) => (
          <TouchableOpacity
            key={tier.id}
            onPress={() => setSelectedTierId(tier.id)}
            className={`p-6 rounded-[32px] mb-6 border-2 transition-all ${
              selectedTierId === tier.id 
                ? "border-brand-500 bg-brand-50" 
                : "border-slate-100 bg-white"
            }`}
          >
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center">
                    <View 
                        className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
                        style={{ backgroundColor: tier.color + '20' }}
                    >
                        <Ionicons name={tier.icon} size={24} color={tier.color} />
                    </View>
                    <View>
                        <Text className="text-xl font-black text-slate-900">{tier.name}</Text>
                        <Text className="text-brand-600 font-bold">{tier.price}</Text>
                    </View>
                </View>
                {selectedTierId === tier.id && (
                    <Ionicons name="checkmark-circle" size={28} color="#1f2aba" />
                )}
            </View>

            <View className="space-y-2">
                {tier.benefits.map((benefit, idx) => (
                    <View key={idx} className="flex-row items-center">
                        <Ionicons name="checkmark" size={16} color={tier.color} />
                        <Text className="ml-2 text-slate-600 font-medium text-sm">{benefit}</Text>
                    </View>
                ))}
            </View>
          </TouchableOpacity>
        ))}

        <View className="mb-10">
          <AuthButton
            label="Upgrade Now"
            onPress={handleUpgrade}
            disabled={!selectedTierId}
          />
        </View>

        <View className="p-5 bg-brand-50 rounded-3xl mb-10 border border-brand-100">
          <View className="flex-row items-center mb-2">
            <Ionicons name="shield-checkmark" size={20} color="#1f2aba" />
            <Text className="ml-2 font-bold text-brand-900">Secure Payment</Text>
          </View>
          <Text className="text-brand-800 text-sm leading-5">
            Upgrading your account is a one-time payment. Once successful, your new benefits will be activated immediately.
          </Text>
        </View>
      </ScrollView>

      <PinModal
        visible={showPin}
        onClose={() => setShowPin(false)}
        onSuccess={handlePinSuccess}
      />

      <ReceiptModal 
        tx={txData} 
        onClose={() => {
          setShowReceipt(false);
          setTxData(null);
        }} 
      />
    </View>
  );
}
