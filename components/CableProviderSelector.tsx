import React from "react";
import { View, TouchableOpacity, Image } from "react-native";

interface Provider {
  id: string;
  name: string;
  logo: any;
}

const PROVIDERS: Provider[] = [
  { 
    id: "dstv", 
    name: "DSTV", 
    logo: require("../assets/images/cable/dstv.png")
  },
  { 
    id: "gotv", 
    name: "GOTV", 
    logo: require("../assets/images/cable/gotv.png")
  },
  { 
    id: "startimes", 
    name: "Startimes", 
    logo: require("../assets/images/cable/startimes.png")
  },
  { 
    id: "showmax", 
    name: "Showmax", 
    logo: require("../assets/images/cable/showmax.png")
  },
];

interface CableProviderSelectorProps {
  selectedProvider: string | null;
  onSelect: (id: string) => void;
}

export function CableProviderSelector({ selectedProvider, onSelect }: CableProviderSelectorProps) {
  return (
    <View className="flex-row justify-between mb-6">
      {PROVIDERS.map((provider) => (
        <TouchableOpacity
          key={provider.id}
          onPress={() => onSelect(provider.id)}
          className={`w-[22%] aspect-square items-center justify-center rounded-2xl border-2 overflow-hidden ${
            selectedProvider === provider.id ? "border-brand-500 bg-brand-50" : "border-slate-100 bg-white"
          }`}
        >
          <View className="w-full h-full items-center justify-center p-2">
            <Image 
              source={provider.logo} 
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
