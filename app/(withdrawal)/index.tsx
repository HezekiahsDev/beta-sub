import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "@/components/AppHeader";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { SleekDropdown } from "@/components/SleekDropdown";
import { PinModal } from "@/components/PinModal";
import ReceiptModal from "@/app/history/ReceiptModal";

const NIGERIAN_BANKS = [
  { label: "Access Bank", value: "access", trailing: "Bank" },
  { label: "Fidelity Bank", value: "fidelity", trailing: "Bank" },
  { label: "First Bank", value: "firstbank", trailing: "Bank" },
  { label: "GTBank", value: "gtb", trailing: "Bank" },
  { label: "Kuda Bank", value: "kuda", trailing: "Bank" },
  { label: "Moniepoint", value: "moniepoint", trailing: "Bank" },
  { label: "Opay", value: "opay", trailing: "Fintech" },
  { label: "PalmPay", value: "palmpay", trailing: "Fintech" },
  { label: "UBA", value: "uba", trailing: "Bank" },
  { label: "Zenith Bank", value: "zenith", trailing: "Bank" },
];

export default function WithdrawalScreen() {
  const router = useRouter();
  const [selectedBankValue, setSelectedBankValue] = useState("");
  const selectedBank = NIGERIAN_BANKS.find(b => b.value === selectedBankValue);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [isResolving, setIsResolving] = useState(false);
  
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  // Mock account name resolution
  useEffect(() => {
    if (accountNumber.length === 10 && selectedBank) {
      setIsResolving(true);
      setTimeout(() => {
        setAccountName("HEZEKIAHS ADENIYE");
        setIsResolving(false);
      }, 1500);
    } else {
      setAccountName("");
    }
  }, [accountNumber, selectedBank]);

  const handleWithdraw = () => {
    if (!selectedBank || accountNumber.length !== 10 || !amount || !accountName) return;
    setShowPin(true);
  };

  const handlePinSuccess = (pin: string) => {
    setShowPin(false);
    const mockTx = {
      id: "wd-" + Math.random().toString(36).substr(2, 9),
      icon: "wallet" as const,
      title: "Bank Withdrawal",
      amount: `-₦${Number(amount).toLocaleString()}`,
      date: new Date().toISOString(),
      status: "Successful" as const,
      details: `Withdrawal of ₦${Number(amount).toLocaleString()} to ${selectedBank?.label} (${accountNumber}) - ${accountName}`,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  const isFormValid = selectedBank && accountNumber.length === 10 && accountName && amount && Number(amount) > 0;

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Withdraw to Bank" showBack={true} />
      
      <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
        <View className="mb-6">
            <Text className="text-slate-500 font-medium mb-4">Transfer funds from your Betasub wallet to any local bank account securely.</Text>
            
            <SleekDropdown
                label="Select Destination Bank"
                options={NIGERIAN_BANKS}
                selectedValue={selectedBankValue}
                onSelect={setSelectedBankValue}
                placeholder="Choose a bank"
            />

            <AuthInput
                label="Account Number"
                placeholder="0123456789"
                value={accountNumber}
                onChangeText={setAccountNumber}
                keyboardType="numeric"
                maxLength={10}
            />

            {isResolving && (
                <View className="flex-row items-center px-4 py-2 bg-slate-50 rounded-xl mb-4">
                    <Text className="text-slate-400 text-xs font-bold">Verifying account...</Text>
                </View>
            )}

            {accountName ? (
                <View className="px-4 py-3 bg-brand-50 rounded-xl mb-4 border border-brand-100">
                    <Text className="text-brand-500 text-[10px] font-black uppercase tracking-widest mb-1">Account Name</Text>
                    <Text className="text-brand-900 font-bold text-base">{accountName}</Text>
                </View>
            ) : null}

            <AuthInput
                label="Amount (₦)"
                placeholder="5,000"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
            />

            <View className="bg-slate-900 p-5 rounded-[28px] mt-4 shadow-xl">
                <View className="flex-row justify-between items-center mb-2">
                    <Text className="text-slate-400 text-xs font-bold">Transaction Fee</Text>
                    <Text className="text-white font-bold">₦10.00</Text>
                </View>
                <View className="h-[1px] bg-slate-800 my-2" />
                <View className="flex-row justify-between items-center">
                    <Text className="text-slate-400 text-xs font-bold">Total Debit</Text>
                    <Text className="text-white text-xl font-black">₦{(Number(amount) + 10).toLocaleString()}</Text>
                </View>
            </View>
        </View>

        <View className="mb-20">
            <AuthButton
                label="Proceed to Withdraw"
                onPress={handleWithdraw}
                disabled={!isFormValid || isResolving}
            />
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
