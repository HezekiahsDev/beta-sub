import { Ionicons } from "@expo/vector-icons";
import { type Href, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AuthButton } from "@/components/auth/AuthButton";
import { BrandLogo } from "@/components/auth/BrandLogo";
import { OnboardingArts } from "@/components/auth/OnboardingArts";
import { useFlow } from "@/providers/FlowProvider";

type Slide = {
  title: string;
  description: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
};

const slides: Slide[] = [
  {
    title: "Pay Bills.\nGet Rewards.\nAll in One App.",
    description:
      "Welcome to Betasub – your trusted companion for seamless bill payments, instant transfers, and exciting rewards.",
    iconName: "receipt-outline",
  },
  {
    title: "Get Verified in Minutes.",
    description:
      "Your security is our priority. Complete your identity verification quickly and safely.",
    iconName: "document-text-outline",
  },
  {
    title: "Spin and Win",
    description:
      "Spin the wheel after qualifying transactions and win exciting rewards.",
    iconName: "flash-outline",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const { completeOnboarding } = useFlow();
  const [index, setIndex] = useState(0);

  const isLastSlide = useMemo(() => index === slides.length - 1, [index]);
  const slide = slides[index];

  const nextSlide = () => {
    setIndex((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const handleSkip = async () => {
    await completeOnboarding();
    router.replace("/login" as Href);
  };

  const goToLogin = async () => {
    await completeOnboarding();
    router.replace("/login" as Href);
  };

  const goToSignUp = async () => {
    await completeOnboarding();
    router.replace("/signup" as Href);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-[#efefef]"
      edges={["top", "left", "right", "bottom"]}
    >
      <View className="flex-1 px-6 pt-4 pb-6">
        <BrandLogo />

        <View className="items-center mt-6">
          <OnboardingArts iconName={slide.iconName} caption="" />
        </View>

        <Text className="mt-10 text-center text-[44px] font-bold leading-[52px] text-black">
          {slide.title}
        </Text>
        <Text className="mt-4 text-xl text-center text-slate-700">
          {slide.description}
        </Text>

        <View className="mt-auto">
          {isLastSlide ? (
            <View className="gap-4 mb-8">
              <AuthButton label="Create account" onPress={goToSignUp} />
              <AuthButton label="Log In" onPress={goToLogin} />
            </View>
          ) : (
            <View className="flex-row items-center justify-between px-2 mb-10">
              <Pressable onPress={handleSkip}>
                <Text className="text-2xl font-medium text-black">Skip</Text>
              </Pressable>
              <Pressable
                onPress={nextSlide}
                className="items-center justify-center h-11 w-11"
              >
                <Ionicons name="chevron-forward" size={24} color="#111111" />
              </Pressable>
            </View>
          )}

          <View className="flex-row items-center justify-center mb-4">
            {slides.map((item, dotIndex) => (
              <View
                key={`${item.title}-${dotIndex}`}
                className={`mx-2 h-3 w-3 rounded-full ${dotIndex === index ? "bg-indigo-800" : "bg-[#c9c9c9]"}`}
              />
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
