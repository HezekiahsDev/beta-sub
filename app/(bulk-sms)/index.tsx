import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput } from "react-native";
import { AppHeader } from "@/components/AppHeader";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";
import { Ionicons } from "@expo/vector-icons";
import ReceiptModal from "../history/ReceiptModal";
import { PinModal } from "@/components/PinModal";
import { SleekDropdown, DropdownOption } from "@/components/SleekDropdown";

const SMS_ROUTES: DropdownOption[] = [
  { value: "normal", label: "Normal Route", trailing: "N4.50/SMS" },
  { value: "corporate", label: "Corporate Route (DND)", trailing: "N6.00/SMS" },
  { value: "otp", label: "OTP Route", trailing: "N12.00/SMS" },
];

export default function BulkSMSScreen() {
  const [senderName, setSenderName] = useState("");
  const [recipients, setRecipients] = useState("");
  const [message, setMessage] = useState("");
  const [route, setRoute] = useState<string>("normal");
  
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const charCount = message.length;
  const pageCount = Math.ceil(charCount / 160) || 1;
  const recipientCount = recipients.split(/[\n,]/).filter(r => r.trim().length > 5).length;
  
  const selectedRoute = SMS_ROUTES.find(r => r.value === route);
  const ratePerSMS = parseFloat(selectedRoute?.trailing?.replace(/[^0-9.]/g, "") || "0");
  const estTotal = recipientCount * pageCount * ratePerSMS;

  const handlePurchase = () => {
    setShowPin(true);
  };

  const handlePinSuccess = (pin: string) => {
    setShowPin(false);
    const mockTx = {
      id: "bs-" + Math.random().toString(36).substr(2, 9),
      icon: "chatbubble-ellipses" as const,
      title: `Bulk SMS - ${senderName}`,
      amount: `N${estTotal.toLocaleString()}`,
      date: new Date().toISOString(),
      status: "Successful" as const,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Bulk SMS" />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <View className="p-6 bg-brand-700 rounded-[32px] mb-8 shadow-lg shadow-brand-500/30">
            <Text className="text-brand-100 font-bold uppercase tracking-widest text-xs mb-2">Service</Text>
            <Text className="text-white text-3xl font-black mb-4">Send Bulk SMS</Text>
            <View className="flex-row items-center bg-white/10 p-3 rounded-2xl border border-white/20">
                <Ionicons name="flash" size={20} color="#ffffff" />
                <Text className="ml-2 text-white font-medium">Instant delivery and high delivery rate</Text>
            </View>
        </View>

        <AuthInput
          label="Sender Name"
          placeholder="e.g. BETASUB"
          value={senderName}
          onChangeText={setSenderName}
          maxLength={11}
        />

        <View className="mb-6">
            <Text className="text-sm font-bold text-slate-700 mb-2">Recipients</Text>
            <TextInput
                multiline
                numberOfLines={4}
                className="bg-slate-50 rounded-2xl p-4 text-slate-800 border border-slate-200 font-medium h-32"
                placeholder="Enter numbers separated by comma or newline"
                value={recipients}
                onChangeText={setRecipients}
                textAlignVertical="top"
            />
            <Text className="text-xs text-slate-500 mt-2 text-right font-bold">
                {recipientCount} Valid Recipients Found
            </Text>
        </View>

        <SleekDropdown
          label="SMS Route"
          placeholder="Select route"
          options={SMS_ROUTES}
          selectedValue={route}
          onSelect={setRoute}
        />

        <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-sm font-bold text-slate-700">Message</Text>
                <Text className={`text-xs font-bold ${charCount > 160 ? "text-orange-500" : "text-brand-600"}`}>
                    {charCount} / 160 ({pageCount} {pageCount > 1 ? "Pages" : "Page"})
                </Text>
            </View>
            <TextInput
                multiline
                numberOfLines={6}
                className="bg-slate-50 rounded-2xl p-4 text-slate-800 border border-slate-200 font-medium h-40"
                placeholder="Type your message here..."
                value={message}
                onChangeText={setMessage}
                textAlignVertical="top"
            />
        </View>

        <View className="p-6 bg-slate-50 rounded-3xl mb-8 border border-slate-100">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-slate-500 font-medium">Recipient Count</Text>
                <Text className="text-slate-900 font-bold">{recipientCount}</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-slate-500 font-medium">Page Count</Text>
                <Text className="text-slate-900 font-bold">{pageCount}</Text>
            </View>
            <View className="flex-row justify-between items-center pb-4 border-b border-slate-200 mb-4">
                <Text className="text-slate-500 font-medium">Rate per SMS</Text>
                <Text className="text-slate-900 font-bold">N{ratePerSMS.toFixed(2)}</Text>
            </View>
            <View className="flex-row justify-between items-center">
                <Text className="text-slate-700 font-bold text-lg">Total Cost</Text>
                <Text className="text-brand-700 font-black text-2xl">N{estTotal.toLocaleString()}</Text>
            </View>
        </View>

        <View className="mb-10">
          <AuthButton
            label="Send SMS"
            onPress={handlePurchase}
            disabled={!senderName || recipientCount === 0 || !message || !route}
          />
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
