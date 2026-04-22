import { Ionicons } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthButton } from "@/components/auth/AuthButton";
import { AuthInput } from "@/components/auth/AuthInput";
import { BrandLogo } from "@/components/auth/BrandLogo";
import { validateSignUp } from "@/lib/validation";

export default function SignUpScreen() {
  const router = useRouter();
  const nav = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agentCode, setAgentCode] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(
    () =>
      validateSignUp({
        name,
        email,
        phone,
        password,
        confirmPassword,
        acceptedTerms,
      }),
    [name, email, phone, password, confirmPassword, acceptedTerms],
  );

  const canSubmit = Object.keys(errors).length === 0;

  const onSubmit = () => {
    setSubmitted(true);
    if (!canSubmit) {
      return;
    }
    router.push("/pin" as Href);
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
            <View className="flex-1 px-4 pt-6 pb-5">
              <View className="flex-row items-center justify-between mb-2">
                <BrandLogo size={68} />
                <Pressable
                  onPress={() => {
                    // prefer native canGoBack when available
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
                  <Ionicons name="chevron-back" size={24} color="#111111" />
                </Pressable>
              </View>

              <Text className="text-center text-[48px] font-bold text-black">
                Create account
              </Text>
              <Text className="mt-1 mb-3 text-xl text-slate-800">
                Create account to get started
              </Text>

              <AuthInput
                label="Name"
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
                autoCapitalize="words"
                error={submitted ? errors.name : undefined}
              />

              <AuthInput
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email address"
                keyboardType="email-address"
                error={submitted ? errors.email : undefined}
              />

              <AuthInput
                label="Mobile Number"
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                error={submitted ? errors.phone : undefined}
              />

              <AuthInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Input your password"
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

              <AuthInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm your password"
                secureTextEntry={!showConfirmPassword}
                rightAdornment={
                  <Pressable
                    onPress={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={20}
                      color="#6B7280"
                    />
                  </Pressable>
                }
                error={submitted ? errors.confirmPassword : undefined}
              />

              <View className="mb-4">
                <View className="flex-row items-center justify-between mb-2">
                  <Text className="text-xl font-medium text-slate-900">
                    Agent Code
                  </Text>
                  <Text className="text-2xl text-slate-500">(Optional)</Text>
                </View>
                <View className="flex-row items-center px-3 border border-indigo-700 h-14 rounded-xl">
                  <TextInput
                    value={agentCode}
                    onChangeText={setAgentCode}
                    placeholder="Referral Code"
                    placeholderTextColor="#C8C8C8"
                    className="flex-1 text-xl text-slate-900"
                  />
                </View>
              </View>

              <Pressable
                onPress={() => setAcceptedTerms((prev) => !prev)}
                className="flex-row items-start mb-2"
              >
                <View
                  className={`mr-2 mt-1 h-5 w-5 items-center justify-center border ${
                    acceptedTerms
                      ? "border-slate-900 bg-white"
                      : "border-slate-700 bg-transparent"
                  }`}
                >
                  {acceptedTerms ? (
                    <Ionicons name="checkmark" size={16} color="#111111" />
                  ) : null}
                </View>
                <Text className="flex-1 text-sm text-slate-700">
                  By proceeding forward you consent to agree to our terms and
                  conditions and privacy policy.
                </Text>
              </Pressable>
              {submitted && errors.acceptedTerms ? (
                <Text className="mb-4 text-base text-rose-600">
                  {errors.acceptedTerms}
                </Text>
              ) : null}

              <View className="mt-auto">
                <AuthButton
                  label="Continue"
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
