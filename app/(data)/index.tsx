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
import { SleekDropdown, DropdownOption } from "@/components/SleekDropdown";

const DATA_TYPES: DropdownOption[] = [
  { value: "sme", label: "SME Data" },
  { value: "gifting", label: "Gifting Data" },
  { value: "corporate", label: "Corporate Gifting" },
];

const DATA_PLANS_BY_TYPE: Record<string, DropdownOption[]> = {
  sme: [
    { value: "sme1", label: "1GB", trailing: "N300", sublabel: "30 Days" },
    { value: "sme2", label: "2GB", trailing: "N550", sublabel: "30 Days" },
    { value: "sme5", label: "5GB", trailing: "N1250", sublabel: "30 Days" },
  ],
  gifting: [
    { value: "g1", label: "1.5GB", trailing: "N1000", sublabel: "30 Days" },
    { value: "g2", label: "2GB", trailing: "N1200", sublabel: "30 Days" },
    { value: "g5", label: "5GB", trailing: "N2500", sublabel: "30 Days" },
  ],
  corporate: [
    { value: "c1", label: "1GB", trailing: "N280", sublabel: "30 Days" },
    { value: "c2", label: "2GB", trailing: "N540", sublabel: "30 Days" },
    { value: "c10", label: "10GB", trailing: "N2600", sublabel: "30 Days" },
  ],
};

export default function DataScreen() {
  const [network, setNetwork] = useState<string | null>(null);
  const [phone, setPhone] = useState("");
  const [dataType, setDataType] = useState<string>("sme");
  const [selectedPlanValue, setSelectedPlanValue] = useState<string>("");
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const availablePlans = DATA_PLANS_BY_TYPE[dataType] || [];
  const selectedPlan = availablePlans.find((p) => p.value === selectedPlanValue);

  const handlePurchase = () => {
    setShowPin(true);
  };

  const handlePinSuccess = (pin: string) => {
    setShowPin(false);
    // Mock purchase logic
    const mockTx = {
      id: "dt-" + Math.random().toString(36).substr(2, 9),
      icon: "phone-portrait" as const,
      title: `${selectedPlan?.label} ${DATA_TYPES.find((t) => t.value === dataType)?.label}`,
      amount: selectedPlan?.trailing || "N0",
      date: new Date().toISOString(),
      status: "Successful" as const,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Buy Data" />
      
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

        <SleekDropdown
          label="Data Type"
          placeholder="Select Data Type"
          options={DATA_TYPES}
          selectedValue={dataType}
          onSelect={(val) => {
            setDataType(val);
            setSelectedPlanValue(""); // reset plan when type changes
          }}
        />

        <SleekDropdown
          label="Data Plan"
          placeholder="Select Data Plan"
          options={availablePlans}
          selectedValue={selectedPlanValue}
          onSelect={setSelectedPlanValue}
        />

        <View className="mb-10">
          <AuthButton
            label="Buy Data"
            onPress={handlePurchase}
            disabled={!network || !phone || !selectedPlanValue}
          />
        </View>

        <View className="p-4 bg-brand-50 rounded-2xl mb-10">
          <View className="flex-row items-center mb-2">
            <Ionicons name="information-circle" size={20} color="#1f2aba" />
            <Text className="ml-2 font-bold text-brand-900">Note</Text>
          </View>
          <Text className="text-brand-800 text-sm leading-5">
            Data bundles are credited instantly to the provided line. Please double check the number.
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
