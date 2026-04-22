import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: any;
  category: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  id: string;
  label: string; // e.g., Home, Office
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  addresses: Address[];
  selectedAddressId: string | null;
  addAddress: (address: Omit<Address, "id">) => void;
  removeAddress: (addressId: string) => void;
  selectAddress: (addressId: string) => void;
  selectedAddress: Address | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      label: "Home",
      fullName: "Hezekiahs Adeniyi",
      phone: "08012345678",
      street: "123, Beta Street",
      city: "Ikeja",
      state: "Lagos",
    },
    {
      id: "2",
      label: "Office",
      fullName: "Hezekiahs Adeniyi",
      phone: "07087654321",
      street: "45, Gamma Avenue",
      city: "Victoria Island",
      state: "Lagos",
    },
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>("1");

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const addAddress = (address: Omit<Address, "id">) => {
    const newAddress = { ...address, id: Math.random().toString(36).substr(2, 9) };
    setAddresses((prev) => [...prev, newAddress]);
    if (!selectedAddressId) setSelectedAddressId(newAddress.id);
  };

  const removeAddress = (addressId: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== addressId));
    if (selectedAddressId === addressId) setSelectedAddressId(null);
  };

  const selectAddress = (addressId: string) => {
    setSelectedAddressId(addressId);
  };

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || null;

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        addresses,
        selectedAddressId,
        addAddress,
        removeAddress,
        selectAddress,
        selectedAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
