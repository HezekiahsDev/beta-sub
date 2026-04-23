import React from "react";
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from "react-native";

export interface SubCategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subCategories?: SubCategory[];
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
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <View style={styles.row}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => onSelect(category.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.chip,
                  selectedCategoryId === category.id ? styles.chipSelected : styles.chipUnselected,
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedCategoryId === category.id ? styles.textWhite : styles.textSlate,
                  ]}
                >
                  {category.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

interface MarketSubCategorySelectorProps {
  subCategories: SubCategory[];
  selectedSubCategoryId: string;
  onSelect: (id: string) => void;
}

export function MarketSubCategorySelector({
  subCategories,
  selectedSubCategoryId,
  onSelect,
}: MarketSubCategorySelectorProps) {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => onSelect("all")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.subChip,
                selectedSubCategoryId === "all" ? styles.subChipSelected : styles.subChipUnselected,
              ]}
            >
              <Text
                style={[
                  styles.subChipText,
                  selectedSubCategoryId === "all" ? styles.textBrand : styles.textSlate,
                ]}
              >
                All
              </Text>
            </View>
          </TouchableOpacity>
          {subCategories.map((sub) => (
            <TouchableOpacity
              key={sub.id}
              onPress={() => onSelect(sub.id)}
              activeOpacity={0.7}
            >
              <View
                style={[
                  styles.subChip,
                  selectedSubCategoryId === sub.id ? styles.subChipSelected : styles.subChipUnselected,
                ]}
              >
                <Text
                  style={[
                    styles.subChipText,
                    selectedSubCategoryId === sub.id ? styles.textBrand : styles.textSlate,
                  ]}
                >
                  {sub.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    marginHorizontal: -16,
  },
  row: {
    flexDirection: "row",
  },
  chip: {
    marginRight: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
    borderWidth: 2,
  },
  chipSelected: {
    borderColor: "#3f55dc",
    backgroundColor: "#3f55dc",
  },
  chipUnselected: {
    borderColor: "#f1f5f9",
    backgroundColor: "#ffffff",
  },
  chipText: {
    fontWeight: "bold",
  },
  subChip: {
    marginRight: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 99,
    borderWidth: 1,
  },
  subChipSelected: {
    borderColor: "#3f55dc",
    backgroundColor: "#eef1ff",
  },
  subChipUnselected: {
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
  },
  subChipText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  textWhite: {
    color: "#ffffff",
  },
  textSlate: {
    color: "#64748b",
  },
  textBrand: {
    color: "#1f2aba",
  },
});
