import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "@/components/AppHeader";
import { useCart } from "@/providers/CartContext";
import { AuthButton } from "@/components/auth/AuthButton";

export default function CartScreen() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();

  if (cartCount === 0) {
    return (
      <View className="flex-1 bg-white">
        <AppHeader title="My Cart" showBack={true} />
        <View className="flex-1 items-center justify-center px-10">
          <View className="w-40 h-40 bg-slate-50 rounded-full items-center justify-center mb-6">
            <Ionicons name="cart-outline" size={64} color="#CBD5E1" />
          </View>
          <Text className="text-2xl font-black text-slate-900 mb-2">Your cart is empty</Text>
          <Text className="text-slate-500 text-center font-medium leading-5 mb-10">
            Looks like you haven't added any products to your cart yet.
          </Text>
          <AuthButton label="Start Shopping" onPress={() => router.replace("/(market)")} />
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="My Cart" showBack={true} />
      
      <ScrollView className="flex-1 px-4 pt-6" showsVerticalScrollIndicator={false}>
        {cart.map((item) => (
          <View key={item.id} className="flex-row bg-slate-50 rounded-3xl p-4 mb-4 items-center">
            <Image
              source={item.image}
              className="w-20 h-20 rounded-2xl"
              resizeMode="cover"
            />
            <View className="flex-1 ml-4">
              <Text className="text-slate-900 font-bold text-base mb-1" numberOfLines={1}>
                {item.name}
              </Text>
              <Text className="text-brand-700 font-black">
                ₦{item.price.toLocaleString()}
              </Text>
              
              <View className="flex-row items-center mt-3">
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg bg-white items-center justify-center border border-slate-200"
                >
                  <Ionicons name="remove" size={16} color="#1f2aba" />
                </TouchableOpacity>
                <Text className="mx-4 font-black text-slate-900">{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-white items-center justify-center border border-slate-200"
                >
                  <Ionicons name="add" size={16} color="#1f2aba" />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => removeFromCart(item.id)}
              className="p-2"
            >
              <Ionicons name="trash-outline" size={24} color="#EF4444" />
            </TouchableOpacity>
          </View>
        ))}
        
        <View className="h-40" />
      </ScrollView>

      <View className="p-6 bg-white border-t border-slate-100 shadow-2xl">
        <View className="flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-slate-500 font-bold text-xs uppercase tracking-widest">Total cost</Text>
            <Text className="text-3xl font-black text-slate-900">₦{cartTotal.toLocaleString()}</Text>
          </View>
          <View className="bg-brand-50 px-4 py-2 rounded-xl">
            <Text className="text-brand-700 font-black">{cartCount} Items</Text>
          </View>
        </View>
        
        <AuthButton
          label="Proceed to Checkout"
          onPress={() => router.push("/(market)/checkout")}
        />
      </View>
    </View>
  );
}
