import { Ionicons } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthButton } from "@/components/auth/AuthButton";
import { AuthInput } from "@/components/auth/AuthInput";
import { BrandLogo } from "@/components/auth/BrandLogo";
import { validateLogin } from "@/lib/validation";
import { useFlow } from "@/providers/FlowProvider";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useFlow();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(
    () => validateLogin({ username, password }),
    [username, password],
  );
  const canSubmit = Object.keys(errors).length === 0;

  const onSubmit = async () => {
    setSubmitted(true);
    if (!canSubmit) {
      return;
    }
    await signIn();
    router.replace("/(tabs)");
  };

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
            <View className="flex-1 px-4 pt-24 pb-4">
              <View className="items-center mb-10">
                <BrandLogo size={80} />
              </View>

              <AuthInput
                label="Username or email"
                value={username}
                onChangeText={setUsername}
                placeholder="Username or email"
                autoCapitalize="words"
                error={submitted ? errors.username : undefined}
              />

              <AuthInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Input Password"
                secureTextEntry={!showPassword}
                rightAdornment={
                  <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#6B7280"
                    />
                  </Pressable>
                }
                error={submitted ? errors.password : undefined}
              />

              <View className="flex-row items-center justify-between mt-1">
                <Pressable
                  onPress={() => setRememberMe((prev) => !prev)}
                  className="flex-row items-center"
                >
                  <View
                    className={`mr-2 h-5 w-5 items-center justify-center rounded-sm border ${
                      rememberMe
                        ? "border-indigo-700 bg-indigo-700"
                        : "border-slate-700"
                    }`}
                  >
                    {rememberMe ? (
                      <Ionicons name="checkmark" size={13} color="#ffffff" />
                    ) : null}
                  </View>
                  <Text className="text-xl text-black">Remember me</Text>
                </Pressable>

                <Pressable>
                  <Text className="text-xl text-black">Forget Password?</Text>
                </Pressable>
              </View>

              <View className="mt-10">
                <AuthButton
                  label="Log In"
                  onPress={onSubmit}
                  disabled={!canSubmit}
                />
              </View>

              <Pressable
                className="items-center mt-6"
                onPress={() => router.push("/signup" as Href)}
              >
                <Text className="text-lg text-slate-700">
                  Do not have an account?{" "}
                  <Text className="font-semibold text-indigo-800">
                    Create account
                  </Text>
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
