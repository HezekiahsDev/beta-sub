import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Address } from "@/providers/CartContext";

interface AddressItemProps {
  address: Address;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onRemove?: (id: string) => void;
}

export function AddressItem({
  address,
  isSelected,
  onSelect,
  onRemove,
}: AddressItemProps) {
  return (
    <TouchableOpacity
      onPress={() => onSelect(address.id)}
      activeOpacity={0.7}
      className={`p-5 rounded-[28px] mb-4 border-2 transition-all ${
        isSelected ? "border-brand-500 bg-brand-50" : "border-slate-100 bg-white"
      }`}
    >
      <View className="flex-row items-start">
        <View className={`w-6 h-6 rounded-full border-2 items-center justify-center mr-4 mt-1 ${
          isSelected ? "border-brand-500 bg-brand-500" : "border-slate-300 bg-white"
        }`}>
          {isSelected && <Ionicons name="checkmark" size={16} color="#ffffff" />}
        </View>
        
        <View className="flex-1">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
                <Text className="text-lg font-black text-slate-900 mr-3">{address.label}</Text>
                {isSelected && (
                    <View className="bg-brand-500 px-2 py-0.5 rounded-lg">
                        <Text className="text-[10px] text-white font-bold uppercase">Default</Text>
                    </View>
                )}
            </View>
            {onRemove && (
                <TouchableOpacity onPress={() => onRemove(address.id)} className="p-1">
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                </TouchableOpacity>
            )}
          </View>
          
          <Text className="text-slate-700 font-bold mb-1">{address.fullName}</Text>
          <Text className="text-slate-500 font-medium text-sm leading-5">
            {address.street}, {address.city}, {address.state}
          </Text>
          <Text className="text-slate-500 font-medium text-sm mt-1">{address.phone}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
