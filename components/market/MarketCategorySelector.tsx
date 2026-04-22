import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";

export interface Category {
  id: string;
  name: string;
  icon: string;
}

interface MarketCategorySelectorProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelect: (id: string) => void;
}

export function MarketCategorySelector({
  categories,
  selectedCategoryId,
  onSelect,
}: MarketCategorySelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mb-6 -mx-4 px-4"
    >
      <View className="flex-row">
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => onSelect(category.id)}
            className={`mr-3 px-6 py-3 rounded-2xl border-2 ${
              selectedCategoryId === category.id
                ? "border-brand-500 bg-brand-500 shadow-lg shadow-brand-500/50"
                : "border-slate-100 bg-white"
            }`}
          >
            <Text
              className={`font-bold ${
                selectedCategoryId === category.id ? "text-white" : "text-slate-500"
              }`}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
