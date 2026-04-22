import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { AuthButton } from "./auth/AuthButton";

interface PinModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (pin: string) => void;
  title?: string;
  description?: string;
}

export function PinModal({
  visible,
  onClose,
  onSuccess,
  title = "Enter Transaction PIN",
  description = "Please enter your 4-digit PIN to authorize this transaction",
}: PinModalProps) {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const refs = useRef<Array<TextInput | null>>([]);

  const onInput = (text: string, index: number) => {
    const next = [...pin];
    const clean = text.replace(/\D/g, "").slice(-1);
    next[index] = clean;
    setPin(next);

    if (clean && index < 3) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !pin[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const pinValue = pin.join("");
    if (pinValue.length === 4) {
      // For now, any 4 digits work (mock)
      onSuccess(pinValue);
      setPin(["", "", "", ""]);
    } else {
      setError("Please enter a valid 4-digit PIN");
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={onClose}
          />
          
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            className="w-full mt-auto"
          >
            <View className="bg-white rounded-t-[40px] px-6 pt-8 pb-10 shadow-2xl">
              <View className="items-center mb-6">
                <View className="w-12 h-1 bg-slate-200 rounded-full mb-6" />
                <View className="w-16 h-16 bg-brand-50 rounded-full items-center justify-center mb-4">
                  <Ionicons name="lock-closed" size={32} color="#1f2aba" />
                </View>
                <Text className="text-2xl font-bold text-slate-900">{title}</Text>
                <Text className="text-slate-500 text-center mt-2 px-4">{description}</Text>
              </View>

              <View className="flex-row justify-center mb-8">
                {pin.map((digit, index) => (
                  <TextInput
                    key={`pin-${index}`}
                    ref={(ref) => {
                      refs.current[index] = ref;
                    }}
                    value={digit}
                    onChangeText={(text) => onInput(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    secureTextEntry={true}
                    maxLength={1}
                    textAlign="center"
                    className="mx-2 text-3xl font-bold text-slate-900 border-2 border-slate-100 h-16 w-16 rounded-2xl bg-slate-50"
                  />
                ))}
              </View>

              {error ? (
                <Text className="text-rose-600 text-center mb-4 font-medium">{error}</Text>
              ) : null}

              <AuthButton
                label="Confirm Transaction"
                onPress={handleSubmit}
                disabled={pin.some(d => !d)}
              />
              
              <TouchableOpacity onPress={onClose} className="mt-4 py-2 items-center">
                <Text className="text-slate-400 font-medium">Cancel</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
