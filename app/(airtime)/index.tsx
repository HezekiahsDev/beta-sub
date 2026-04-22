import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "@/components/AppHeader";
import { NetworkSelector } from "@/components/NetworkSelector";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { Ionicons } from "@expo/vector-icons";
import ReceiptModal from "../history/ReceiptModal";
import { PinModal } from "@/components/PinModal";

const QUICK_AMOUNTS = ["100", "200", "500", "1000", "2000", "5000"];

export default function AirtimeScreen() {
  const [network, setNetwork] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const handlePurchase = () => {
    setShowPin(true);
  };

  const handlePinSuccess = (pin: string) => {
    setShowPin(false);
    // Mock purchase logic
    const mockTx = {
      id: "at-" + Math.random().toString(36).substr(2, 9),
      icon: "call" as const,
      title: "Airtime Purchase",
      amount: `N${amount}`,
      date: new Date().toISOString(),
      status: "Successful" as const,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Buy Airtime" />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-bold text-slate-800 mb-4">Select Network</Text>
        <NetworkSelector selectedNetwork={network} onSelect={setNetwork} />

        <AuthInput
          label="Phone Number"
          placeholder="080 1234 5678"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          rightAdornment={
            <TouchableOpacity className="p-2">
              <Ionicons name="person-add-outline" size={24} color="#1f2aba" />
            </TouchableOpacity>
          }
        />

        <AuthInput
          label="Amount"
          placeholder="N 0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <View className="flex-row flex-wrap mb-8">
          {QUICK_AMOUNTS.map((val) => (
            <TouchableOpacity
              key={val}
              onPress={() => setAmount(val)}
              className={`mr-2 mb-2 px-4 py-2 rounded-xl border ${
                amount === val ? "bg-brand-700 border-brand-700" : "bg-white border-slate-200"
              }`}
            >
              <Text className={`font-bold ${amount === val ? "text-white" : "text-slate-600"}`}>
                N{val}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mb-10">
          <AuthButton
            label="Buy Airtime"
            onPress={handlePurchase}
            disabled={!network || !phone || !amount}
          />
        </View>

        <View className="p-4 bg-brand-50 rounded-2xl mb-10">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={20} color="#1f2aba" />
            <Text className="ml-2 font-bold text-brand-900">Note</Text>
          </View>
          <Text className="text-brand-800 text-sm leading-5">
            Please ensure you have selected the correct network and entered the right phone number. Transactions are irreversible.
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
