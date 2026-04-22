import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { Ionicons } from "@expo/vector-icons";
import ReceiptModal from "../history/ReceiptModal";
import { PinModal } from "@/components/PinModal";
import { SleekDropdown, DropdownOption } from "@/components/SleekDropdown";

const EXAM_TYPES: DropdownOption[] = [
  { value: "waec", label: "WAEC Result Checker", trailing: "N4,200" },
  { value: "neco", label: "NECO Token", trailing: "N1,100" },
  { value: "nabteb", label: "NABTEB Result Checker", trailing: "N1,500" },
];

export default function ExamsScreen() {
  const [examType, setExamType] = useState<string>("waec");
  const [quantity, setQuantity] = useState("1");
  const [phone, setPhone] = useState("");
  
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const selectedExam = EXAM_TYPES.find((e) => e.value === examType);
  const unitPrice = parseInt(selectedExam?.trailing?.replace(/[^0-9]/g, "") || "0");
  const totalPrice = unitPrice * (parseInt(quantity) || 0);

  const handlePurchase = () => {
    setShowPin(true);
  };

  const handlePinSuccess = (pin: string) => {
    setShowPin(false);
    const mockTx = {
      id: "ex-" + Math.random().toString(36).substr(2, 9),
      icon: "school" as const,
      title: `${selectedExam?.label} (${quantity})`,
      amount: `N${totalPrice.toLocaleString()}`,
      date: new Date().toISOString(),
      status: "Successful" as const,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Exam Pins" />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <View className="p-6 bg-brand-50 rounded-[32px] items-center mb-8 border border-brand-100">
            <View className="w-16 h-16 rounded-2xl bg-white items-center justify-center shadow-sm">
                <Ionicons name="school" size={32} color="#1f2aba" />
            </View>
            <Text className="mt-4 text-xl font-black text-brand-900 text-center">Result Checker Pins</Text>
            <Text className="text-brand-600 font-medium text-center">Get your exam tokens instantly</Text>
        </View>

        <SleekDropdown
          label="Exam Type"
          placeholder="Select exam"
          options={EXAM_TYPES}
          selectedValue={examType}
          onSelect={setExamType}
        />

        <AuthInput
          label="Quantity"
          placeholder="1"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
        />

        <AuthInput
          label="Phone Number"
          placeholder="080 1234 5678"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <View className="p-6 bg-slate-50 rounded-3xl mb-8">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-slate-500 font-medium">Unit Price</Text>
                <Text className="text-slate-900 font-bold">{selectedExam?.trailing}</Text>
            </View>
            <View className="flex-row justify-between items-center pb-4 border-b border-slate-200 mb-4">
                <Text className="text-slate-500 font-medium">Quantity</Text>
                <Text className="text-slate-900 font-bold">{quantity || 0}</Text>
            </View>
            <View className="flex-row justify-between items-center">
                <Text className="text-slate-700 font-bold text-lg">Total Amount</Text>
                <Text className="text-brand-700 font-black text-2xl">N{totalPrice.toLocaleString()}</Text>
            </View>
        </View>

        <View className="mb-10">
          <AuthButton
            label="Buy Pin"
            onPress={handlePurchase}
            disabled={!examType || !quantity || !phone}
          />
        </View>

        <View className="p-4 bg-brand-50 rounded-2xl mb-10">
          <View className="flex-row items-center mb-2">
            <Ionicons name="alert-circle" size={20} color="#1f2aba" />
            <Text className="ml-2 font-bold text-brand-900">Note</Text>
          </View>
          <Text className="text-brand-800 text-sm leading-5">
            Exam pins are non-refundable. Please ensure you select the correct exam type and quantity.
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
