import React, { useState } from "react";
import { View, ScrollView, Text, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { AppHeader } from "@/components/AppHeader";
import { ProductCard } from "@/components/market/ProductCard";
import { MarketCategorySelector, Category, MarketSubCategorySelector } from "@/components/market/MarketCategorySelector";
import { useCart, Product } from "@/providers/CartContext";

const CATEGORIES: Category[] = [
  { id: "all", name: "All Products", icon: "grid-outline" },
  { 
    id: "electronics", 
    name: "Electronics", 
    icon: "hardware-chip-outline",
    subCategories: [
      { id: "phones", name: "Phones" },
      { id: "laptops", name: "Laptops" },
      { id: "audio", name: "Audio" }
    ]
  },
  { 
    id: "fashion", 
    name: "Fashion", 
    icon: "shirt-outline",
    subCategories: [
      { id: "clothing", name: "Clothing" },
      { id: "shoes", name: "Shoes" },
      { id: "accessories", name: "Accessories" }
    ]
  },
  { 
    id: "home", 
    name: "Home & Office", 
    icon: "home-outline",
    subCategories: [
      { id: "furniture", name: "Furniture" },
      { id: "kitchen", name: "Kitchen" },
      { id: "office", name: "Office" }
    ]
  },
  { 
    id: "gadgets", 
    name: "Gadgets", 
    icon: "watch-outline",
    subCategories: [
      { id: "wearables", name: "Wearables" },
      { id: "gaming", name: "Gaming" },
      { id: "smarthome", name: "Smart Home" }
    ]
  },
];

const MOCK_PRODUCTS: Product[] = [
  // Electronics - Phones
  {
    id: "p1",
    name: "iPhone 15 Pro",
    price: 1250000,
    category: "Electronics",
    subCategory: "phones",
    image: { uri: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&auto=format&fit=crop" },
    description: "The latest iPhone with Titanium design.",
  },
  {
    id: "p9",
    name: "Samsung S24 Ultra",
    price: 1450000,
    category: "Electronics",
    subCategory: "phones",
    image: { uri: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop" },
    description: "Ultimate Galaxy experience with AI.",
  },
  {
    id: "p10",
    name: "Google Pixel 8 Pro",
    price: 980000,
    category: "Electronics",
    subCategory: "phones",
    image: { uri: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop" },
    description: "The best of Google AI camera.",
  },

  // Electronics - Laptops
  {
    id: "p2",
    name: "MacBook Air M2",
    price: 1800000,
    category: "Electronics",
    subCategory: "laptops",
    image: { uri: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800&auto=format&fit=crop" },
    description: "Supercharged by M2 chip.",
  },
  {
    id: "p11",
    name: "MacBook Pro M3",
    price: 2800000,
    category: "Electronics",
    subCategory: "laptops",
    image: { uri: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop" },
    description: "Pro power in a pro package.",
  },
  {
    id: "p12",
    name: "Dell XPS 15",
    price: 1650000,
    category: "Electronics",
    subCategory: "laptops",
    image: { uri: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop" },
    description: "The perfect balance of power and portability.",
  },

  // Fashion - Shoes
  {
    id: "p3",
    name: "Nike Air Max 270",
    price: 120000,
    category: "Fashion",
    subCategory: "shoes",
    image: { uri: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop" },
    description: "Comfortable and stylish sneakers.",
  },
  {
    id: "p13",
    name: "Adidas Ultraboost",
    price: 145000,
    category: "Fashion",
    subCategory: "shoes",
    image: { uri: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=800&auto=format&fit=crop" },
    description: "Energy-returning boost cushioning.",
  },
  {
    id: "p14",
    name: "Yeezy Boost 350",
    price: 350000,
    category: "Fashion",
    subCategory: "shoes",
    image: { uri: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=800&auto=format&fit=crop" },
    description: "Iconic lifestyle footwear.",
  },

  // Gadgets - Audio
  {
    id: "p4",
    name: "Sony WH-1000XM5",
    price: 450000,
    category: "Electronics", // Moved to electronics for better mapping
    subCategory: "audio",
    image: { uri: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop" },
    description: "Industry-leading noise canceling headphones.",
  },
  {
    id: "p15",
    name: "AirPods Pro 2",
    price: 250000,
    category: "Electronics",
    subCategory: "audio",
    image: { uri: "https://images.unsplash.com/photo-1588423770674-f2811379c5a4?q=80&w=800&auto=format&fit=crop" },
    description: "Magic like you've never heard.",
  },

  // Home - Office
  {
    id: "p5",
    name: "Ergonomic Office Chair",
    price: 150000,
    category: "Home",
    subCategory: "office",
    image: { uri: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=800&auto=format&fit=crop" },
    description: "Stay productive and comfortable.",
  },
  {
    id: "p16",
    name: "Standing Desk",
    price: 280000,
    category: "Home",
    subCategory: "office",
    image: { uri: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?q=80&w=800&auto=format&fit=crop" },
    description: "Switch between sitting and standing effortlessly.",
  },

  // Gadgets - Gaming
  {
    id: "p7",
    name: "Gaming Console",
    price: 650000,
    category: "Gadgets",
    subCategory: "gaming",
    image: { uri: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800&auto=format&fit=crop" },
    description: "Next-gen gaming experience.",
  },
  {
    id: "p17",
    name: "ASUS ROG Ally",
    price: 750000,
    category: "Gadgets",
    subCategory: "gaming",
    image: { uri: "https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?q=80&w=800&auto=format&fit=crop" },
    description: "AAA gaming in the palm of your hands.",
  },

  // Gadgets - Wearables
  {
    id: "p6",
    name: "Apple Watch Ultra",
    price: 950000,
    category: "Gadgets",
    subCategory: "wearables",
    image: { uri: "https://images.unsplash.com/photo-1664574653790-dee0e10a7407?q=80&w=800&auto=format&fit=crop" },
    description: "The most rugged Apple Watch.",
  },
  {
    id: "p18",
    name: "Garmin Fenix 7X",
    price: 720000,
    category: "Gadgets",
    subCategory: "wearables",
    image: { uri: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop" },
    description: "The choice for elite athletes.",
  },

  // Home - Kitchen
  {
    id: "p8",
    name: "Smart Coffee Maker",
    price: 85000,
    category: "Home",
    subCategory: "kitchen",
    image: { uri: "https://images.unsplash.com/photo-1520970014086-2208d157c9e2?q=80&w=800&auto=format&fit=crop" },
    description: "Brew your coffee with your phone.",
  },
  {
    id: "p19",
    name: "Air Fryer XL",
    price: 120000,
    category: "Home",
    subCategory: "kitchen",
    image: { uri: "https://images.unsplash.com/photo-1506484381205-f7945653044d?q=80&w=800&auto=format&fit=crop" },
    description: "Healthy frying for the whole family.",
  },
];

export default function MarketIndex() {
  const router = useRouter();
  const { addToCart, cartCount } = useCart();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setSelectedSubCategory("all"); // Reset sub-category when main category changes
  };

  const currentCategory = CATEGORIES.find(c => c.id === selectedCategory);
  const showSubCategories = currentCategory && currentCategory.subCategories && currentCategory.subCategories.length > 0;

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSubCategory = selectedSubCategory === "all" || product.subCategory?.toLowerCase() === selectedSubCategory.toLowerCase();
    return matchesSearch && matchesCategory && matchesSubCategory;
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
          onSelect={handleCategorySelect}
        />

        {showSubCategories && (
          <MarketSubCategorySelector
            subCategories={currentCategory.subCategories!}
            selectedSubCategoryId={selectedSubCategory}
            onSelect={setSelectedSubCategory}
          />
        )}
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
