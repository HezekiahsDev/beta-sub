import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, Modal } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "@/components/AppHeader";
import { useCart, Address } from "@/providers/CartContext";
import { AddressItem } from "@/components/market/AddressItem";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthButton } from "@/components/auth/AuthButton";

export default function AddressesScreen() {
  const router = useRouter();
  const { addresses, selectedAddressId, selectAddress, addAddress, removeAddress } = useCart();
  const [showAddModal, setShowAddModal] = useState(false);

  // New Address State
  const [label, setLabel] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const handleAddAddress = () => {
    if (!label || !fullName || !phone || !street || !city || !state) return;
    addAddress({ label, fullName, phone, street, city, state });
    setShowAddModal(false);
    // Reset form
    setLabel("");
    setFullName("");
    setPhone("");
    setStreet("");
    setCity("");
    setState("");
  };

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="My Addresses" showBack={true} />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        <Text className="text-lg font-bold text-slate-800 mb-4">Select delivery address</Text>
        
        {addresses.map((address) => (
          <AddressItem
            key={address.id}
            address={address}
            isSelected={selectedAddressId === address.id}
            onSelect={selectAddress}
            onRemove={removeAddress}
          />
        ))}

        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          className="flex-row items-center justify-center p-6 rounded-[32px] border-2 border-dashed border-slate-200 mt-2 mb-20"
        >
          <Ionicons name="add-circle-outline" size={24} color="#1f2aba" />
          <Text className="ml-3 text-brand-700 font-bold text-lg">Add New Address</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Add Address Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View className="flex-1 bg-white">
          <View className="flex-row justify-between items-center px-4 py-5 border-b border-slate-100">
            <Text className="text-2xl font-black text-slate-900">New Address</Text>
            <TouchableOpacity onPress={() => setShowAddModal(false)}>
              <Ionicons name="close-circle" size={32} color="#CBD5E1" />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
            <AuthInput
              label="Label (e.g. Home, Office)"
              placeholder="Home"
              value={label}
              onChangeText={setLabel}
            />
            <AuthInput
              label="Full Name"
              placeholder="Hezekiahs Adeniyi"
              value={fullName}
              onChangeText={setFullName}
            />
            <AuthInput
              label="Phone Number"
              placeholder="080 1234 5678"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <AuthInput
              label="Street Address"
              placeholder="123, Beta Street"
              value={street}
              onChangeText={setStreet}
            />
            <View className="flex-row justify-between space-x-2">
                <View className="flex-1">
                    <AuthInput
                        label="City"
                        placeholder="Ikeja"
                        value={city}
                        onChangeText={setCity}
                    />
                </View>
                <View className="flex-1">
                    <AuthInput
                        label="State"
                        placeholder="Lagos"
                        value={state}
                        onChangeText={setState}
                    />
                </View>
            </View>
            
            <View className="mt-6 mb-20">
                <AuthButton
                    label="Save Address"
                    onPress={handleAddAddress}
                    disabled={!label || !fullName || !phone || !street || !city || !state}
                />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
}
