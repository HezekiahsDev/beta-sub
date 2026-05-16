import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

type Account = {
  AccountNumber?: string;
  BankName?: string;
  Charges?: string;
  Name?: string;
};

export default function AccountsList({ accounts }: { accounts: Account[] }) {
  if (!accounts || accounts.length === 0) return null;

  return (
    <View className="mt-4">
      <Text className="mb-2 text-sm font-medium text-white">
        Payment Accounts
      </Text>
      <FlatList
        data={accounts}
        keyExtractor={(item, idx) => `${item.BankName ?? "acct"}-${idx}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="mr-3 p-3 rounded-xl bg-white/10"
            onPress={() => {}}
          >
            <Text className="text-sm font-semibold text-white">
              {item.BankName ?? "Bank"}
            </Text>
            <Text className="text-xs text-white/80">{item.Name}</Text>
            <Text className="text-xs text-white/60 mt-1">
              Fee: {item.Charges ?? "—"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
