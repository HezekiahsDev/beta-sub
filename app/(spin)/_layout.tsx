import { Stack } from "expo-router";

export default function SpinLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
