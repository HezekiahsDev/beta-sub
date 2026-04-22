import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { CableProviderSelector } from "@/components/CableProviderSelector";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { Ionicons } from "@expo/vector-icons";
import ReceiptModal from "../history/ReceiptModal";
import { PinModal } from "@/components/PinModal";
import { SleekDropdown, DropdownOption } from "@/components/SleekDropdown";

const SUBSCRIPTION_TYPES: DropdownOption[] = [
  { value: "renewal", label: "Renewal" },
  { value: "change", label: "Change Package" },
];

const PACKAGES_BY_PROVIDER: Record<string, DropdownOption[]> = {
  dstv: [
    { value: "d1", label: "DSTV Padi", trailing: "N2,500" },
    { value: "d2", label: "DSTV Yanga", trailing: "N3,500" },
    { value: "d3", label: "DSTV Confam", trailing: "N6,200" },
    { value: "d4", label: "DSTV Compact", trailing: "N10,500" },
    { value: "d5", label: "DSTV Premium", trailing: "N24,500" },
  ],
  gotv: [
    { value: "g1", label: "GOTV Smallie", trailing: "N1,100" },
    { value: "g2", label: "GOTV Jinja", trailing: "N2,250" },
    { value: "g3", label: "GOTV Jolli", trailing: "N3,300" },
    { value: "g4", label: "GOTV Max", trailing: "N4,850" },
    { value: "g5", label: "GOTV Supa", trailing: "N6,400" },
  ],
  startimes: [
    { value: "s1", label: "Nova", trailing: "N1,200" },
    { value: "s2", label: "Basic", trailing: "N2,100" },
    { value: "s3", label: "Smart", trailing: "N3,500" },
    { value: "s4", label: "Classic", trailing: "N5,000" },
    { value: "s5", label: "Super", trailing: "N7,000" },
  ],
  showmax: [
    { value: "sh1", label: "Showmax Mobile", trailing: "N1,200" },
    { value: "sh2", label: "Showmax Pro Mobile", trailing: "N3,200" },
    { value: "sh3", label: "Showmax Standard", trailing: "N2,900" },
  ],
};

export default function CableScreen() {
  const [provider, setProvider] = useState<string | null>(null);
  const [iuc, setIuc] = useState("");
  const [subType, setSubType] = useState<string>("renewal");
  const [selectedPackageValue, setSelectedPackageValue] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const availablePackages = provider ? PACKAGES_BY_PROVIDER[provider] || [] : [];
  const selectedPackage = availablePackages.find((p) => p.value === selectedPackageValue);

  const handleVerify = () => {
    if (!iuc || !provider) return;
    setIsVerifying(true);
    // Mock verification
    setTimeout(() => {
      setCustomerName("HEZEKIAHS ADENIYI");
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
      id: "cb-" + Math.random().toString(36).substr(2, 9),
      icon: "tv" as const,
      title: `${provider?.toUpperCase()} Subscription - ${selectedPackage?.label}`,
      amount: selectedPackage?.trailing || "N0",
      date: new Date().toISOString(),
      status: "Successful" as const,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Cable TV" />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-bold text-slate-800 mb-4">Select Provider</Text>
        <CableProviderSelector 
          selectedProvider={provider} 
          onSelect={(id) => {
            setProvider(id);
            setSelectedPackageValue("");
            setIsVerified(false);
          }} 
        />

        <AuthInput
          label="Smartcard / IUC Number"
          placeholder="Enter IUC Number"
          value={iuc}
          onChangeText={(val) => {
            setIuc(val);
            setIsVerified(false);
          }}
          keyboardType="numeric"
          rightAdornment={
            <TouchableOpacity className="p-2" onPress={() => {}}>
              <Ionicons name="scan-outline" size={24} color="#1f2aba" />
            </TouchableOpacity>
          }
        />

        <SleekDropdown
          label="Select Package"
          placeholder="Choose a package"
          options={availablePackages}
          selectedValue={selectedPackageValue}
          onSelect={setSelectedPackageValue}
        />

        <SleekDropdown
          label="Subscription Type"
          placeholder="Renewal or Change"
          options={SUBSCRIPTION_TYPES}
          selectedValue={subType}
          onSelect={setSubType}
        />

        {!isVerified ? (
          <View className="mt-4 mb-10">
            <AuthButton
              label={isVerifying ? "Verifying..." : "Verify Details"}
              onPress={handleVerify}
              disabled={!provider || !iuc || !selectedPackageValue || isVerifying}
            />
          </View>
        ) : (
          <View className="mt-4 mb-10">
            <View className="p-5 bg-brand-50 rounded-3xl border border-brand-100 mb-8">
              <View className="flex-row justify-between items-center mb-4 pb-4 border-b border-brand-100">
                <Text className="text-brand-600 font-medium">Customer Name</Text>
                <Text className="text-brand-900 font-bold text-lg">{customerName}</Text>
              </View>
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-brand-600 font-medium">Package</Text>
                <Text className="text-brand-800 font-semibold">{selectedPackage?.label}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-brand-600 font-medium">Amount</Text>
                <Text className="text-brand-900 font-black text-xl">{selectedPackage?.trailing}</Text>
              </View>
            </View>

            <AuthButton
              label="Pay Now"
              onPress={handlePurchase}
            />
          </View>
        )}

        <View className="p-4 bg-slate-50 rounded-2xl mb-10">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={20} color="#64748b" />
            <Text className="ml-2 font-bold text-slate-700">Note</Text>
          </View>
          <Text className="text-slate-600 text-sm leading-5">
            Please ensure the IUC number is correct. Your account will be credited immediately after payment.
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
