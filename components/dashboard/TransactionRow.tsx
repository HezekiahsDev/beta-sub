import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

type TransactionStatus = "Successful" | "Pending";

type TransactionRowProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  amount: string;
  date: string;
  status: TransactionStatus;
};

const statusStyles: Record<TransactionStatus, string> = {
  Successful: "bg-[#1f2aba] text-white",
  Pending:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
};

export function TransactionRow({
  icon,
  title,
  amount,
  date,
  status,
}: TransactionRowProps) {
  return (
    <View className="flex-row items-center px-3 py-3 mb-2 bg-white border rounded-2xl border-slate-200">
      <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-[#1f2aba]">
        <Ionicons name={icon} size={19} color="#ffffff" />
      </View>
      <View className="flex-1">
        <Text className="text-sm font-semibold text-slate-900">{title}</Text>
        <Text className="mt-0.5 text-xs text-slate-500">{date}</Text>
      </View>
      <View className="items-end">
        <Text className="mb-1 text-sm font-bold text-slate-900">{amount}</Text>
        <Text
          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${statusStyles[status]}`}
        >
          {status}
        </Text>
      </View>
    </View>
  );
}
