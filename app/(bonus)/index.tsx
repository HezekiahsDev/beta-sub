import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "@/components/AppHeader";
import { AuthButton } from "@/components/auth/AuthButton";
import { PinModal } from "@/components/PinModal";
import ReceiptModal from "@/app/history/ReceiptModal";
import { TransactionRow } from "@/components/dashboard/TransactionRow";

export default function BonusScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const bonusBalance = 2500;

  const handleWithdraw = () => {
    if (!amount || Number(amount) <= 0 || Number(amount) > bonusBalance) return;
    setShowPin(true);
  };

  const handlePinSuccess = (pin: string) => {
    setShowPin(false);
    const mockTx = {
      id: "bn-" + Math.random().toString(36).substr(2, 9),
      icon: "rocket" as const,
      title: "Bonus Withdrawal",
      amount: `₦${Number(amount).toLocaleString()}`,
      date: new Date().toISOString(),
      status: "Successful" as const,
      details: `Withdrawal of ₦${Number(amount).toLocaleString()} from bonus balance to main wallet.`,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  const isFormValid = amount && Number(amount) > 0 && Number(amount) <= bonusBalance;

  return (
    <View className="flex-1 bg-slate-50">
      <AppHeader title="Bonus" showBack={true} />
      
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Minimalist Balance Header */}
        <View className="py-12 items-center bg-white border-b border-slate-100">
          <Text className="text-slate-400 font-bold uppercase tracking-[3px] text-[10px] mb-2">Available Balance</Text>
          <View className="flex-row items-baseline">
            <Text className="text-2xl font-light text-slate-400 mr-1">₦</Text>
            <Text className="text-6xl font-black text-slate-900 tracking-tighter">
              {bonusBalance.toLocaleString()}
            </Text>
          </View>
          <View className="mt-4 flex-row items-center px-3 py-1 bg-brand-50 rounded-full">
            <View className="w-1.5 h-1.5 rounded-full bg-brand-500 mr-2" />
            <Text className="text-brand-600 text-[10px] font-black uppercase tracking-tight">Active Cashback</Text>
          </View>
        </View>

        {/* Minimalist Withdrawal Input */}
        <View className="px-6 -mt-6">
          <View className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
            <Text className="text-slate-900 font-black text-xl mb-1 text-center">Withdraw Funds</Text>
            <Text className="text-slate-400 text-xs mb-8 text-center">Transfer your bonus earnings to your main wallet</Text>
            
            <View className="mb-6">
              <View className="flex-row items-center border-b-2 border-slate-100 py-3 focus:border-brand-500">
                 <Text className="text-2xl font-bold text-slate-400 mr-3">₦</Text>
                 <TextInput
                   className="flex-1 text-3xl font-black text-slate-900"
                   placeholder="0.00"
                   placeholderTextColor="#cbd5e1"
                   value={amount}
                   onChangeText={setAmount}
                   keyboardType="numeric"
                 />
              </View>
              {amount && Number(amount) > bonusBalance && (
                <Text className="text-rose-500 text-[10px] font-bold mt-2">Insufficient bonus balance</Text>
              )}
            </View>

            <TouchableOpacity 
                onPress={handleWithdraw}
                disabled={!isFormValid}
                className={`py-4 rounded-2xl items-center shadow-md ${isFormValid ? 'bg-brand-600 shadow-brand-200' : 'bg-slate-200 shadow-none'}`}
            >
                <Text className={`font-black text-base ${isFormValid ? 'text-white' : 'text-slate-400'}`}>Withdraw Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* History Section */}
        <View className="px-6 mt-10 pb-20">
          <View className="flex-row justify-between items-center mb-6 px-1">
            <Text className="text-slate-900 font-black text-lg">Activity</Text>
            <TouchableOpacity>
              <Text className="text-slate-400 font-bold text-xs">View All</Text>
            </TouchableOpacity>
          </View>

          <View className="space-y-1">
            <TransactionRow
                icon="rocket-outline"
                title="Referral Bonus"
                amount="+₦500.00"
                date="Today, 10:45 AM"
                status="Successful"
            />
            <TransactionRow
                icon="wallet-outline"
                title="Data Cashback"
                amount="+₦50.00"
                date="Yesterday, 4:20 PM"
                status="Successful"
            />
             <TransactionRow
                icon="rocket-outline"
                title="Referral Bonus"
                amount="+₦500.00"
                date="20 Apr, 2:15 PM"
                status="Successful"
            />
          </View>
        </View>
      </ScrollView>

      <PinModal
        visible={showPin}
        onClose={() => setShowPin(false)}
        onSuccess={handlePinSuccess}
      />

      {showReceipt && (
        <ReceiptModal
          tx={txData}
          onClose={() => {
            setShowReceipt(false);
            router.replace("/(tabs)");
          }}
        />
      )}
    </View>
  );
}
