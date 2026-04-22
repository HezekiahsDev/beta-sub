import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { ElectricityProviderSelector } from "@/components/ElectricityProviderSelector";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { Ionicons } from "@expo/vector-icons";
import ReceiptModal from "../history/ReceiptModal";
import { PinModal } from "@/components/PinModal";
import { SleekDropdown, DropdownOption } from "@/components/SleekDropdown";

const METER_TYPES: DropdownOption[] = [
  { value: "prepaid", label: "Prepaid" },
  { value: "postpaid", label: "Postpaid" },
];

export default function ElectricityScreen() {
  const [disco, setDisco] = useState<string | null>(null);
  const [meterNumber, setMeterNumber] = useState("");
  const [meterType, setMeterType] = useState<string>("prepaid");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  
  const [isVerified, setIsVerified] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const handleVerify = () => {
    if (!meterNumber || !disco) return;
    setIsVerifying(true);
    // Mock meter verification
    setTimeout(() => {
      setCustomerName("HEZEKIAHS ADENIYI");
      setCustomerAddress("123, BETA STREET, LAGOS STATE");
      setIsVerified(true);
      setIsVerifying(false);
    }, 1500);
  };

  const handlePurchase = () => {
    setShowPin(true);
  };

  const handlePinSuccess = (pin: string) => {
    setShowPin(false);
    const mockTx = {
      id: "el-" + Math.random().toString(36).substr(2, 9),
      icon: "flash" as const,
      title: `${disco?.toUpperCase()} ${meterType} - ${meterNumber}`,
      amount: `N${amount}`,
      date: new Date().toISOString(),
      status: "Successful" as const,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Electricity" />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-bold text-slate-800 mb-4">Select Disco</Text>
        <ElectricityProviderSelector 
          selectedDisco={disco} 
          onSelect={(id) => {
            setDisco(id);
            setIsVerified(false);
          }} 
        />

        <View className="flex-row justify-between space-x-2">
            <View className="flex-1">
                <SleekDropdown
                    label="Meter Type"
                    placeholder="Type"
                    options={METER_TYPES}
                    selectedValue={meterType}
                    onSelect={setMeterType}
                />
            </View>
            <View className="flex-[2]">
                <AuthInput
                    label="Meter Number"
                    placeholder="Enter Meter No"
                    value={meterNumber}
                    onChangeText={(val) => {
                        setMeterNumber(val);
                        setIsVerified(false);
                    }}
                    keyboardType="numeric"
                />
            </View>
        </View>

        <AuthInput
          label="Amount"
          placeholder="N 0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />

        <AuthInput
          label="Customer Phone"
          placeholder="080 1234 5678"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {!isVerified ? (
          <View className="mt-4 mb-10">
            <AuthButton
              label={isVerifying ? "Verifying..." : "Verify Meter"}
              onPress={handleVerify}
              disabled={!disco || !meterNumber || !amount || isVerifying}
            />
          </View>
        ) : (
          <View className="mt-4 mb-10">
            <View className="p-5 bg-brand-50 rounded-3xl border border-brand-100 mb-8">
              <View className="flex-row justify-between items-center mb-3 pb-3 border-b border-brand-100">
                <Text className="text-brand-600 font-medium">Customer</Text>
                <Text className="text-brand-900 font-bold">{customerName}</Text>
              </View>
              <View className="mb-3 pb-3 border-b border-brand-100">
                <Text className="text-brand-600 font-medium mb-1">Address</Text>
                <Text className="text-brand-800 font-semibold text-sm">{customerAddress}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-brand-600 font-medium">Amount to Pay</Text>
                <Text className="text-brand-900 font-black text-xl">N{amount}</Text>
              </View>
            </View>

            <AuthButton
              label="Pay Bill"
              onPress={handlePurchase}
            />
          </View>
        )}

        <View className="p-4 bg-brand-50 rounded-2xl mb-10">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={20} color="#1f2aba" />
            <Text className="ml-2 font-bold text-brand-900">Note</Text>
          </View>
          <Text className="text-brand-800 text-sm leading-5">
            Please ensure the meter number and disco selected are correct. Token will be sent via SMS and shown on receipt.
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
