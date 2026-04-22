import React, { useMemo, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  SectionList,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SectionHeader } from "../../components/dashboard/SectionHeader";
import { TransactionRow } from "../../components/dashboard/TransactionRow";
import ReceiptModal from "../history/ReceiptModal";

type Tx = {
  id: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  amount: string;
  date: string; // ISO
  status: "Successful" | "Pending" | "Failed";
};

const ALL_ITEMS: Tx[] = Array.from({ length: 36 }).map((_, i) => {
  const daysAgo = Math.floor(i / 6); // 6 items per day bucket
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(9 + (i % 6), 15);
  return {
    id: `tx-${i}`,
    icon: i % 3 === 0 ? "call" : i % 3 === 1 ? "logo-usd" : "flash",
    title:
      i % 3 === 0
        ? "Airtime top-up"
        : i % 3 === 1
          ? "DSTV subscription"
          : "Electricity token",
    amount: `N${(Math.floor(Math.random() * 90) + 10) * 100}`,
    date: date.toISOString(),
    status: i % 5 === 0 ? "Pending" : "Successful",
  } as Tx;
});

function getDateLabel(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const diff = Math.floor((+today - +d) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function groupByDate(items: Tx[]) {
  const map = new Map<string, Tx[]>();
  items.forEach((it) => {
    const key = getDateLabel(it.date);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(it);
  });
  const sections = Array.from(map.entries()).map(([title, data]) => ({
    title,
    data,
  }));
  return sections;
}

export default function HistoryScreen() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<
    "All" | "Successful" | "Failed" | "Pending"
  >("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Tx[]>(ALL_ITEMS.slice(0, 12));
  const [selectedTx, setSelectedTx] = useState<Tx | null>(null);

  const filters = ["All", "Successful", "Failed", "Pending"] as const;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((it) => {
      if (filter !== "All" && it.status !== filter) return false;
      if (!q) return true;
      return (it.title + it.amount).toLowerCase().includes(q);
    });
  }, [items, filter, query]);

  const sections = useMemo(() => groupByDate(filtered), [filtered]);

  const loadMore = useCallback(() => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const next = ALL_ITEMS.slice(
        0,
        Math.min(ALL_ITEMS.length, items.length + 8),
      );
      setItems(next);
      setPage((p) => p + 1);
      setLoading(false);
    }, 700);
  }, [items.length, loading]);

  const onRefresh = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setItems(ALL_ITEMS.slice(0, 12));
      setPage(1);
      setLoading(false);
    }, 700);
  }, []);

  return (
    <SafeAreaView
      className="flex-1 px-4 bg-white"
      edges={["top", "left", "right"]}
    >
      <View className="pt-3">
        <Text className="text-4xl font-black text-slate-900">History</Text>
        <Text className="mt-1 mb-3 text-sm text-slate-500">
          Track your recent activities and payment records.
        </Text>

        <View className="flex-row items-center mb-3">
          <View className="flex-row items-center flex-1 px-3 py-2 bg-white border rounded-3xl border-slate-200">
            <Ionicons name="search" size={18} color="#6b7280" />
            <TextInput
              placeholder="Search transactions"
              placeholderTextColor="#9ca3af"
              value={query}
              onChangeText={setQuery}
              className="flex-1 ml-3 text-sm text-slate-900"
            />
          </View>
        </View>

        <View className="flex-row mb-4">
          {filters.map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setFilter(f as any)}
              className={`mr-3 px-4 py-2 rounded-full border ${filter === f ? "bg-[#1f2aba] border-[#1f2aba]" : "bg-white border-slate-200"}`}
            >
              <Text
                className={`${filter === f ? "text-white" : "text-slate-700"} text-sm font-semibold`}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <SectionList
        style={{ backgroundColor: "#ffffff" }}
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <View className="mt-1 mb-2">
            <Text className="text-sm font-bold text-slate-700">{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedTx(item)}>
            <TransactionRow
              icon={item.icon}
              title={item.title}
              amount={item.amount}
              date={new Date(item.date).toLocaleString()}
              status={item.status === "Failed" ? "Pending" : item.status}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 140 }}
        onEndReachedThreshold={0.6}
        onEndReached={() => {
          if (items.length < ALL_ITEMS.length) loadMore();
        }}
        ListEmptyComponent={() => (
          <View className="items-center mt-20">
            <Ionicons name="document-text-outline" size={56} color="#c7c7cc" />
            <Text className="mt-4 text-sm text-slate-500">
              No transactions found.
            </Text>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="items-center py-6">
            {loading ? (
              <ActivityIndicator size="small" color="#1f2aba" />
            ) : null}
          </View>
        )}
        onRefresh={onRefresh}
        refreshing={loading}
      />

      <ReceiptModal tx={selectedTx} onClose={() => setSelectedTx(null)} />
    </SafeAreaView>
  );
}
