import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

interface Disco {
  id: string;
  name: string;
  abbr: string;
  color: string;
}

const DISCOS: Disco[] = [
  { id: "aedc", name: "Abuja Electricity", abbr: "AEDC", color: "#4f46e5" },
  { id: "ekedc", name: "Eko Electricity", abbr: "EKEDC", color: "#0891b2" },
  { id: "ikedc", name: "Ikeja Electricity", abbr: "IKEDC", color: "#e11d48" },
  { id: "ibedc", name: "Ibadan Electricity", abbr: "IBEDC", color: "#ea580c" },
  { id: "kedco", name: "Kano Electricity", abbr: "KEDCO", color: "#16a34a" },
  { id: "phedc", name: "PH Electricity", abbr: "PHEDC", color: "#2563eb" },
  { id: "jedc", name: "Jos Electricity", abbr: "JEDC", color: "#9333ea" },
  { id: "eedc", name: "Enugu Electricity", abbr: "EEDC", color: "#db2777" },
];

interface ElectricityProviderSelectorProps {
  selectedDisco: string | null;
  onSelect: (id: string) => void;
}

export function ElectricityProviderSelector({ selectedDisco, onSelect }: ElectricityProviderSelectorProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      className="mb-6 -mx-4 px-4"
    >
      <View className="flex-row">
        {DISCOS.map((disco) => (
          <TouchableOpacity
            key={disco.id}
            onPress={() => onSelect(disco.id)}
            className={`mr-3 items-center justify-center rounded-2xl border-2 p-3 w-28 ${
              selectedDisco === disco.id ? "border-brand-500 bg-brand-50" : "border-slate-100 bg-white"
            }`}
          >
            <View 
              className="w-12 h-12 rounded-full items-center justify-center mb-2"
              style={{ backgroundColor: disco.color + '20' }}
            >
              <Text className="font-black text-xs" style={{ color: disco.color }}>{disco.abbr}</Text>
            </View>
            <Text 
              className={`text-[10px] font-bold text-center ${
                selectedDisco === disco.id ? "text-brand-700" : "text-slate-500"
              }`}
            >
              {disco.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
