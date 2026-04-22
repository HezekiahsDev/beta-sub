import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/providers/CartContext";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onPress?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(product)}
      activeOpacity={0.8}
      className="bg-white rounded-3xl overflow-hidden mb-6 w-[48%] border border-slate-100 shadow-sm"
    >
      <View className="aspect-square bg-slate-50 relative">
        <Image
          source={product.image}
          className="w-full h-full"
          resizeMode="cover"
        />
        <TouchableOpacity
          onPress={() => onAddToCart(product)}
          className="absolute bottom-3 right-3 w-10 h-10 bg-brand-700 rounded-xl items-center justify-center shadow-lg shadow-brand-500/50"
        >
          <Ionicons name="add" size={24} color="#ffffff" />
        </TouchableOpacity>
        
        <View className="absolute top-3 left-3 px-2 py-1 bg-white/80 rounded-lg backdrop-blur-md">
            <Text className="text-[10px] font-black text-brand-700 uppercase">{product.category}</Text>
        </View>
      </View>
      
      <View className="p-3">
        <Text className="text-slate-900 font-bold text-sm mb-1" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-brand-700 font-black text-lg">
          ₦{product.price.toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
