import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { Ionicons } from "@expo/vector-icons";
import ReceiptModal from "../history/ReceiptModal";
import { PinModal } from "@/components/PinModal";
import { SleekDropdown, DropdownOption } from "@/components/SleekDropdown";

const SMILE_BUNDLES: DropdownOption[] = [
  { value: "s1", label: "1GB Bigga", trailing: "N500", sublabel: "30 Days" },
  { value: "s15", label: "1.5GB Bigga", trailing: "N1,000", sublabel: "30 Days" },
  { value: "s3", label: "3GB Bigga", trailing: "N1,500", sublabel: "30 Days" },
  { value: "s5", label: "5GB Bigga", trailing: "N2,000", sublabel: "30 Days" },
  { value: "s10", label: "10GB Bigga", trailing: "N3,000", sublabel: "30 Days" },
  { value: "s15u", label: "15GB Unlimited", trailing: "N6,000", sublabel: "30 Days" },
];

export default function SmileScreen() {
  const [smileId, setSmileId] = useState("");
  const [selectedBundleValue, setSelectedBundleValue] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const selectedBundle = SMILE_BUNDLES.find((b) => b.value === selectedBundleValue);

  const handleVerify = () => {
    if (!smileId) return;
    setIsVerifying(true);
    // Mock verification
    setTimeout(() => {
      setAccountName("HEZEKIAHS ADENIYI");
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
      id: "sm-" + Math.random().toString(36).substr(2, 9),
      icon: "happy" as const,
      title: `Smile Data - ${selectedBundle?.label}`,
      amount: selectedBundle?.trailing || "N0",
      date: new Date().toISOString(),
      status: "Successful" as const,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Smile Data" />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-3xl bg-brand-50 items-center justify-center border border-brand-100 overflow-hidden">
            <Image 
              source={require("../../assets/images/network/smile.png")}
              style={{ width: '80%', height: '80%' }}
              resizeMode="contain"
            />
          </View>
          <Text className="mt-4 text-xl font-black text-slate-800">Smile 4G LTE</Text>
          <Text className="text-slate-500 font-medium">Fast & Reliable Internet</Text>
        </View>

        <AuthInput
          label="Smile Account ID"
          placeholder="Enter Account ID"
          value={smileId}
          onChangeText={(val) => {
            setSmileId(val);
            setIsVerified(false);
          }}
          keyboardType="numeric"
          rightAdornment={
            <TouchableOpacity className="p-2">
              <Ionicons name="person-outline" size={24} color="#1f2aba" />
            </TouchableOpacity>
          }
        />

        <SleekDropdown
          label="Select Bundle"
          placeholder="Choose a data bundle"
          options={SMILE_BUNDLES}
          selectedValue={selectedBundleValue}
          onSelect={setSelectedBundleValue}
        />

        {!isVerified ? (
          <View className="mt-4 mb-10">
            <AuthButton
              label={isVerifying ? "Verifying..." : "Verify Account"}
              onPress={handleVerify}
              disabled={!smileId || !selectedBundleValue || isVerifying}
            />
          </View>
        ) : (
          <View className="mt-4 mb-10">
            <View className="p-5 bg-brand-50 rounded-3xl border border-brand-100 mb-8">
              <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-brand-100">
                <Text className="text-brand-600 font-medium">Account Name</Text>
                <Text className="text-brand-900 font-bold text-lg">{accountName}</Text>
              </View>
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-brand-600 font-medium">Bundle</Text>
                <Text className="text-brand-800 font-semibold">{selectedBundle?.label}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-brand-600 font-medium">Amount</Text>
                <Text className="text-brand-900 font-black text-xl">{selectedBundle?.trailing}</Text>
              </View>
            </View>

            <AuthButton
              label="Purchase Bundle"
              onPress={handlePurchase}
            />
          </View>
        )}

        <View className="p-4 bg-brand-50/50 rounded-2xl mb-10 border border-brand-100/50">
          <View className="flex-row items-center mb-2">
            <Ionicons name="flash" size={20} color="#1f2aba" />
            <Text className="ml-2 font-bold text-brand-900">Instant Delivery</Text>
          </View>
          <Text className="text-brand-800 text-sm leading-5">
            Your Smile account will be credited immediately. Please ensure the Account ID is correct to avoid wrong top-ups.
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
