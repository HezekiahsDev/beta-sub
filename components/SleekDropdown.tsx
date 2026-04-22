import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { SafeAreaView } from "react-native-safe-area-context";

export interface DropdownOption {
  value: string;
  label: string;
  sublabel?: string;
  trailing?: string;
}

interface SleekDropdownProps {
  label: string;
  placeholder: string;
  options: DropdownOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  error?: string;
}

export function SleekDropdown({
  label,
  placeholder,
  options,
  selectedValue,
  onSelect,
  error,
}: SleekDropdownProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <View className="mb-4">
      <Text className="mb-2 text-xl font-medium text-slate-900">{label}</Text>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        className={`h-14 flex-row items-center rounded-xl border px-4 bg-white ${
          error ? "border-rose-600" : "border-indigo-700"
        }`}
      >
        <Text className={`flex-1 text-xl ${selectedOption ? "text-slate-900" : "text-slate-400"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#4338ca" />
      </TouchableOpacity>
      {error ? <Text className="mt-1 text-base text-rose-600">{error}</Text> : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          />

          <View className="bg-white rounded-t-[40px] px-6 pt-6 pb-10 shadow-2xl h-[70%]">
            <View className="items-center mb-6">
              <View className="w-12 h-1 bg-slate-200 rounded-full mb-6" />
              <Text className="text-2xl font-bold text-slate-900">Select {label}</Text>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item.value);
                    setModalVisible(false);
                  }}
                  className={`p-4 mb-3 rounded-2xl border-2 flex-row justify-between items-center ${
                    selectedValue === item.value
                      ? "border-brand-500 bg-brand-50"
                      : "border-slate-50 bg-white"
                  }`}
                >
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-slate-900">
                      {item.label}
                    </Text>
                    {item.sublabel && (
                      <Text className="text-sm text-slate-500 mt-1">
                        {item.sublabel}
                      </Text>
                    )}
                  </View>
                  {item.trailing && (
                    <Text className="text-xl font-black text-brand-700 ml-4">
                      {item.trailing}
                    </Text>
                  )}
                  {selectedValue === item.value && (
                    <Ionicons name="checkmark-circle" size={24} color="#1f2aba" className="ml-2" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
