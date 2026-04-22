import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

type Tx = {
  id: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  amount: string;
  date: string;
  status: "Successful" | "Pending" | "Failed";
};

interface ReceiptModalProps {
  tx: Tx | null;
  onClose: () => void;
}

const ReceiptModal: React.FC<ReceiptModalProps> = ({ tx, onClose }) => {
  if (!tx) return null;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Transaction Receipt: ${tx.title} - ${tx.amount} - Status: ${tx.status}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={!!tx}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />
        
        <View className="w-[90%] bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <View className="items-center pt-8 pb-4 bg-slate-50">
            <View className={`w-16 h-16 rounded-full items-center justify-center ${tx.status === 'Successful' ? 'bg-green-100' : tx.status === 'Pending' ? 'bg-amber-100' : 'bg-red-100'}`}>
              <Ionicons 
                name={tx.icon} 
                size={32} 
                color={tx.status === 'Successful' ? '#16a34a' : tx.status === 'Pending' ? '#d97706' : '#dc2626'} 
              />
            </View>
            <Text className="mt-4 text-lg font-bold text-slate-900">{tx.title}</Text>
            <Text className="text-3xl font-black mt-1 text-[#1f2aba]">{tx.amount}</Text>
            <View className={`mt-2 px-3 py-1 rounded-full ${tx.status === 'Successful' ? 'bg-green-100' : tx.status === 'Pending' ? 'bg-amber-100' : 'bg-red-100'}`}>
              <Text className={`text-xs font-bold ${tx.status === 'Successful' ? 'text-green-700' : tx.status === 'Pending' ? 'text-amber-700' : 'text-red-700'}`}>
                {tx.status}
              </Text>
            </View>
          </View>

          {/* Details */}
          <View className="px-6 py-6">
            <View className="flex-row justify-between mb-4">
              <Text className="text-slate-500 text-sm">Transaction Date</Text>
              <Text className="text-slate-900 text-sm font-semibold">
                {new Date(tx.date).toLocaleDateString()} {new Date(tx.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-slate-500 text-sm">Transaction ID</Text>
              <Text className="text-slate-900 text-sm font-semibold">{tx.id.toUpperCase()}</Text>
            </View>
            <View className="flex-row justify-between mb-4">
              <Text className="text-slate-500 text-sm">Payment Method</Text>
              <Text className="text-slate-900 text-sm font-semibold">Wallet Balance</Text>
            </View>
            
            <View className="h-[1px] bg-slate-100 my-2" />

            {/* Actions */}
            <View className="flex-row mt-6 space-x-3">
              <TouchableOpacity 
                onPress={handleShare}
                className="flex-1 flex-row items-center justify-center bg-slate-100 py-3 rounded-xl mr-2"
              >
                <Ionicons name="share-outline" size={18} color="#475569" className="mr-2" />
                <Text className="text-slate-700 font-bold ml-2">Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                onPress={() => {}}
                className="flex-1 flex-row items-center justify-center bg-[#1f2aba] py-3 rounded-xl"
              >
                <Ionicons name="download-outline" size={18} color="white" className="mr-2" />
                <Text className="text-white font-bold ml-2">Download</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              onPress={onClose}
              className="mt-4 py-2 items-center"
            >
              <Text className="text-slate-400 font-medium">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default ReceiptModal;
