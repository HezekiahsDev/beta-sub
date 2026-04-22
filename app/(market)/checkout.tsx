import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "@/components/AppHeader";
import { useCart } from "@/providers/CartContext";
import { AuthButton } from "@/components/auth/AuthButton";
import { PinModal } from "@/components/PinModal";
import ReceiptModal from "../history/ReceiptModal";

export default function CheckoutScreen() {
  const router = useRouter();
  const { cart, cartTotal, cartCount, clearCart, selectedAddress } = useCart();
  const [showPin, setShowPin] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [txData, setTxData] = useState<any>(null);

  const handleCheckout = () => {
    if (!selectedAddress) return;
    setShowPin(true);
  };

  const handlePinSuccess = (pin: string) => {
    setShowPin(false);
    const mockTx = {
      id: "mk-" + Math.random().toString(36).substr(2, 9),
      icon: "basket" as const,
      title: "Marketplace Order",
      amount: `N${cartTotal.toLocaleString()}`,
      date: new Date().toISOString(),
      status: "Successful" as const,
      details: `${cartCount} items purchased for delivery to ${selectedAddress?.label}`,
    };
    setTxData(mockTx);
    setShowReceipt(true);
  };

  const handleReceiptClose = () => {
    setShowReceipt(false);
    clearCart();
    router.replace("/(tabs)");
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Checkout" showBack={true} />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <View className="p-6 bg-slate-900 rounded-[32px] mb-8 shadow-xl">
            <Text className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-1">Order Total</Text>
            <Text className="text-white text-3xl font-black mb-4">₦{cartTotal.toLocaleString()}</Text>
            
            <TouchableOpacity 
                onPress={() => router.push("/(market)/addresses")}
                className="flex-row items-center bg-white/10 p-4 rounded-2xl border border-white/20"
            >
                <View className="w-10 h-10 bg-white/10 rounded-xl items-center justify-center mr-3">
                    <Ionicons name="location" size={20} color="#ffffff" />
                </View>
                <View className="flex-1">
                    <Text className="text-white font-black text-xs uppercase opacity-60">Delivering to</Text>
                    {selectedAddress ? (
                        <Text className="text-white font-bold" numberOfLines={1}>
                            {selectedAddress.label} - {selectedAddress.street}
                        </Text>
                    ) : (
                        <Text className="text-orange-400 font-bold">Select Delivery Address</Text>
                    )}
                </View>
                <Ionicons name="chevron-forward" size={20} color="#ffffff80" />
            </TouchableOpacity>
        </View>

        <Text className="text-lg font-bold text-slate-800 mb-4">Order Summary</Text>
        <View className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
            {cart.map((item) => (
                <View key={item.id} className="flex-row justify-between items-center mb-3">
                    <Text className="text-slate-600 font-medium flex-1 mr-4">{item.name} x{item.quantity}</Text>
                    <Text className="text-slate-900 font-bold">₦{(item.price * item.quantity).toLocaleString()}</Text>
                </View>
            ))}
            
            <View className="h-[1px] bg-slate-200 my-4" />
            
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-slate-500 font-medium">Subtotal</Text>
                <Text className="text-slate-900 font-bold">₦{cartTotal.toLocaleString()}</Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-slate-500 font-medium">Delivery Fee</Text>
                <Text className="text-emerald-600 font-bold">FREE</Text>
            </View>
            <View className="flex-row justify-between items-center mt-2">
                <Text className="text-slate-900 font-black text-lg">Total Amount</Text>
                <Text className="text-brand-700 font-black text-2xl">₦{cartTotal.toLocaleString()}</Text>
            </View>
        </View>

        <View className="mb-10">
          <AuthButton
            label="Pay Now"
            onPress={handleCheckout}
            disabled={!selectedAddress}
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
        onClose={handleReceiptClose} 
      />
    </View>
  );
}
