import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

interface Network {
  id: string;
  name: string;
  logo: any;
}

const NETWORKS: Network[] = [
  { 
    id: "mtn", 
    name: "MTN", 
    logo: require("../assets/images/network/mtn.png")
  },
  { 
    id: "airtel", 
    name: "Airtel", 
    logo: require("../assets/images/network/airtel.png")
  },
  { 
    id: "glo", 
    name: "Glo", 
    logo: require("../assets/images/network/glo.png")
  },
  { 
    id: "9mobile", 
    name: "9mobile", 
    logo: require("../assets/images/network/9mobile.png")
  },
];

interface NetworkSelectorProps {
  selectedNetwork: string | null;
  onSelect: (id: string) => void;
}

export function NetworkSelector({ selectedNetwork, onSelect }: NetworkSelectorProps) {
  return (
    <View className="flex-row justify-between mb-6">
      {NETWORKS.map((network) => (
        <TouchableOpacity
          key={network.id}
          onPress={() => onSelect(network.id)}
          className={`w-[22%] aspect-square items-center justify-center rounded-2xl border-2 overflow-hidden ${
            selectedNetwork === network.id ? "border-brand-500 bg-brand-50" : "border-slate-100 bg-white"
          }`}
        >
          <View className="w-full h-full items-center justify-center p-2">
            <Image 
              source={network.logo} 
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}
