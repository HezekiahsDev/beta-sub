import { Ionicons } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthButton } from "@/components/auth/AuthButton";
import { validatePin } from "@/lib/validation";
import { useFlow } from "@/providers/FlowProvider";

type PinRowProps = {
  label: string;
  value: string[];
  onChange: (next: string[]) => void;
};

function PinRow({ label, value, onChange }: PinRowProps) {
  const refs = useRef<Array<TextInput | null>>([]);

  const onInput = (text: string, index: number) => {
    const next = [...value];
    const clean = text.replace(/\D/g, "").slice(-1);
    next[index] = clean;
    onChange(next);

    if (clean && index < refs.current.length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <View className="mb-8">
      <Text className="mb-2 text-3xl font-medium text-black">{label}</Text>
      <View className="flex-row">
        {value.map((digit, index) => (
          <TextInput
            key={`${label}-${index}`}
            ref={(ref) => {
              refs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(text) => onInput(text, index)}
            keyboardType="number-pad"
            secureTextEntry={true}
            textContentType="password"
            maxLength={1}
            textAlign="center"
            className="mr-2 text-2xl text-black border border-indigo-700 h-14 w-14 rounded-xl"
          />
        ))}
      </View>
    </View>
  );
}

export default function PinScreen() {
  const router = useRouter();
  const nav = useNavigation();
  const { signIn } = useFlow();
  const [createPin, setCreatePin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    const createValue = createPin.join("");
    const confirmValue = confirmPin.join("");
    const validationError = validatePin(createValue, confirmValue);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    await signIn();
    router.replace("/(tabs)");
  };

  const canSubmit = createPin.every(Boolean) && confirmPin.every(Boolean);

  return (
    <SafeAreaView
      className="flex-1 bg-[#efefef]"
      edges={["top", "left", "right", "bottom"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 px-4 pt-6 pb-5">
              <View className="flex-row items-center justify-between mb-14">
                <Pressable
                  onPress={() => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    if (nav?.canGoBack && nav.canGoBack()) {
                      router.back();
                    } else {
                      router.replace("/login" as Href);
                    }
                  }}
                  className="items-center justify-center w-10 h-10"
                >
                  <Ionicons name="chevron-back" size={30} color="#111111" />
                </Pressable>
                <Pressable onPress={() => router.replace("/login" as Href)}>
                  <Text className="text-2xl text-black">Log in</Text>
                </Pressable>
              </View>

              <Text className="text-5xl font-bold leading-[56px] text-black">
                Add Your 4-Digit Transfer Pin
              </Text>
              <Text className="mt-3 mb-8 text-2xl text-slate-800">
                The pin help you authorize transaction safely.
              </Text>

              <PinRow
                label="Create Pin"
                value={createPin}
                onChange={setCreatePin}
              />
              <PinRow
                label="Confirm Pin"
                value={confirmPin}
                onChange={setConfirmPin}
              />

              {error ? (
                <Text className="text-base text-rose-600">{error}</Text>
              ) : null}

              <View className="mt-auto">
                <AuthButton
                  label="Create Account"
                  onPress={onSubmit}
                  disabled={!canSubmit}
                />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
