import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { FlowProvider } from "@/providers/FlowProvider";
import { CartProvider } from "@/providers/CartContext";

import "../global.css";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <FlowProvider>
      <CartProvider>
        <RootLayoutNav />
      </CartProvider>
    </FlowProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(airtime)" options={{ headerShown: false }} />
        <Stack.Screen name="(data)" options={{ headerShown: false }} />
        <Stack.Screen name="(cable)" options={{ headerShown: false }} />
        <Stack.Screen name="(smile)" options={{ headerShown: false }} />
        <Stack.Screen name="(electricity)" options={{ headerShown: false }} />
        <Stack.Screen name="(exams)" options={{ headerShown: false }} />
        <Stack.Screen name="(bulk-sms)" options={{ headerShown: false }} />
        <Stack.Screen name="(wallet)" options={{ headerShown: false }} />
        <Stack.Screen name="(referral)" options={{ headerShown: false }} />
        <Stack.Screen name="(settings)" options={{ headerShown: false }} />
        <Stack.Screen name="(upgrade)" options={{ headerShown: false }} />
        <Stack.Screen name="(market)" options={{ headerShown: false }} />
        <Stack.Screen name="(spin)" options={{ headerShown: false }} />
        <Stack.Screen name="(withdrawal)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
