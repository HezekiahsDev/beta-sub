import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "@/providers/CartContext";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onPress?: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart, onPress }: ProductCardProps) {
  if (!product) return null;

  return (
    <TouchableOpacity
      onPress={() => onPress && onPress(product)}
      activeOpacity={0.8}
      style={styles.wrapper}
    >
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={product.image}
            style={styles.image}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => onAddToCart(product)}
            activeOpacity={0.7}
            style={styles.addButtonContainer}
          >
            <View style={styles.addButton}>
              <Ionicons name="add" size={24} color="#ffffff" />
            </View>
          </TouchableOpacity>
          
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.category.toUpperCase()}</Text>
          </View>
        </View>
        
        <View style={styles.details}>
          <Text style={styles.name} numberOfLines={1}>
            {product.name}
          </Text>
          <Text style={styles.price}>
            ₦{product.price.toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "48%",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#f1f5f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: "#f8fafc",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 12,
    right: 12,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: "#1f2aba",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "900",
    color: "#1f2aba",
  },
  details: {
    padding: 12,
  },
  name: {
    color: "#0f172a",
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
  },
  price: {
    color: "#1f2aba",
    fontWeight: "900",
    fontSize: 18,
  },
});
