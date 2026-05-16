import { Ionicons } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthButton } from "@/components/auth/AuthButton";
import { AuthInput } from "@/components/auth/AuthInput";
import { BrandLogo } from "@/components/auth/BrandLogo";
import { endpoints } from "@/lib/api";
import { validateLogin } from "@/lib/validation";
import { useFlow } from "@/providers/FlowProvider";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useFlow();
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const errors = useMemo(
    () => validateLogin({ PhoneNumber, password }),
    [PhoneNumber, password],
  );
  const canSubmit = Object.keys(errors).length === 0;

  const onSubmit = async () => {
    setSubmitted(true);
    setApiError("");
    if (!canSubmit) {
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("PhoneNumber", PhoneNumber);
      formData.append("Password", password);

      const response = await fetch(endpoints.login, {
        method: "POST",
        body: formData, // the prompt says Form Data (NOT JSON)
      });

      const responseText = await response.text();
      let parseResult;
      try {
        parseResult = JSON.parse(responseText);
      } catch (e) {
        // If not JSON, maybe a plain string error or something else
      }

      if (!response.ok || (parseResult && parseResult.status === "error")) {
        setApiError(parseResult?.message || "Login failed");
        return;
      }

      // The API returns `ApiToken` and a full user payload. Prefer that.
      const token =
        parseResult?.ApiToken ||
        parseResult?.token ||
        parseResult?.access_token ||
        parseResult?.AccessToken;

      if (token) {
        // Pass the full parsed response so the flow provider can set user
        // immediately and then refresh details in the background.
        await signIn(token, parseResult);
        router.replace("/(tabs)");
      } else {
        setApiError("Authentication failed: No token received.");
      }
    } catch (error) {
      setApiError("A network error occurred.");
    } finally {
      setLoading(false);
    }
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
                label="PhoneNumber or email"
                value={PhoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="PhoneNumber or email"
                autoCapitalize="words"
                error={submitted ? errors.PhoneNumber : undefined}
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

              {apiError ? (
                <Text className="mt-4 text-lg text-center text-rose-600">
                  {apiError}
                </Text>
              ) : null}

              <View className="mt-10">
                <AuthButton
                  label={loading ? "Logging in..." : "Log In"}
                  onPress={onSubmit}
                  disabled={!canSubmit || loading}
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
