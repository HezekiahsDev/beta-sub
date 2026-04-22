import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "@/components/AppHeader";
import { ProductCard } from "@/components/market/ProductCard";
import { MarketCategorySelector, Category } from "@/components/market/MarketCategorySelector";
import { useCart, Product } from "@/providers/CartContext";

const CATEGORIES: Category[] = [
  { id: "all", name: "All Products", icon: "grid-outline" },
  { id: "electronics", name: "Electronics", icon: "hardware-chip-outline" },
  { id: "fashion", name: "Fashion", icon: "shirt-outline" },
  { id: "home", name: "Home & Office", icon: "home-outline" },
  { id: "gadgets", name: "Gadgets", icon: "watch-outline" },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "iPhone 15 Pro",
    price: 1250000,
    category: "Electronics",
    image: { uri: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop" },
    description: "The latest iPhone with Titanium design.",
  },
  {
    id: "p2",
    name: "MacBook Air M2",
    price: 1800000,
    category: "Electronics",
    image: { uri: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop" },
    description: "Supercharged by M2 chip.",
  },
  {
    id: "p3",
    name: "Nike Air Max 270",
    price: 120000,
    category: "Fashion",
    image: { uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
    description: "Comfortable and stylish sneakers.",
  },
  {
    id: "p4",
    name: "Sony WH-1000XM5",
    price: 450000,
    category: "Gadgets",
    image: { uri: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop" },
    description: "Industry-leading noise canceling headphones.",
  },
  {
    id: "p5",
    name: "Ergonomic Office Chair",
    price: 150000,
    category: "Home",
    image: { uri: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=800&auto=format&fit=crop" },
    description: "Stay productive and comfortable.",
  },
  {
    id: "p6",
    name: "Apple Watch Ultra",
    price: 950000,
    category: "Gadgets",
    image: { uri: "https://images.unsplash.com/photo-1664574653790-dee0e10a7407?q=80&w=800&auto=format&fit=crop" },
    description: "The most rugged Apple Watch.",
  },
];

export default function MarketIndex() {
  const router = useRouter();
  const { addToCart, cartCount } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <View className="flex-1 bg-white">
      <AppHeader title="Marketplace" showBack={true} />
      
      <View className="px-4 pt-4">
        <View className="flex-row items-center bg-slate-50 rounded-2xl px-4 py-3 border border-slate-100 mb-6">
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            className="flex-1 ml-3 text-slate-900 font-medium"
            placeholder="Search products, brands, accounts..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <MarketCategorySelector
          categories={CATEGORIES}
          selectedCategoryId={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap justify-between">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={() => addToCart(product)}
            />
          ))}
        </View>
        
        {filteredProducts.length === 0 && (
          <View className="items-center justify-center py-20">
            <Ionicons name="search-outline" size={64} color="#e2e8f0" />
            <Text className="mt-4 text-slate-400 font-bold">No products found</Text>
          </View>
        )}
        
        <View className="h-20" />
      </ScrollView>

      {cartCount > 0 && (
        <TouchableOpacity
          onPress={() => router.push("/(market)/cart")}
          className="absolute bottom-6 right-6 bg-brand-700 px-6 py-4 rounded-3xl flex-row items-center shadow-xl shadow-brand-500/50"
        >
          <Ionicons name="cart" size={24} color="#ffffff" />
          <Text className="text-white font-black ml-3">View Cart ({cartCount})</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
