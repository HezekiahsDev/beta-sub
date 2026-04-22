import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function CustomTabIcon({
  name,
  label,
  focused,
  color,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  focused: boolean;
  color: string;
}) {
  if (focused) {
    return (
      <View
        style={{
          width: 58,
          height: 58,
          borderRadius: 29,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "rgba(255,255,255,0.45)",
          backgroundColor: "rgba(255,255,255,0.18)",
          marginTop: -2,
        }}
      >
        <Ionicons name={name} size={18} color={color} />
        <Text style={{ color, fontSize: 10, fontWeight: "500", marginTop: 2 }}>
          {label}
        </Text>
      </View>
    );
  }
  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Ionicons
        name={name}
        size={18}
        color={color}
        style={{ marginBottom: 3 }}
      />
      <Text style={{ color, fontSize: 8, fontWeight: "500" }}>{label}</Text>
    </View>
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const tabBarBackground = "#1f2aba"; // brand deep blue
  const activeColor = "#ffffff";
  const inactiveColor = "rgba(255,255,255,0.75)";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          paddingTop: 0,
        },
        tabBarStyle: {
          position: "absolute",
          left: 0,
          alignItems: "center",
          justifyContent: "center",
          // make the bar shorter than full width by adding a right inset
          right: 72,
          bottom: Math.max(insets.bottom, 8) + 0, // add extra spacing to the bottom
          borderTopWidth: 0,
          elevation: 18,
          height: 72,
          paddingBottom: 8,
          paddingTop: 18,
          paddingLeft: 8,
          paddingRight: 12,
          marginRight: 31,
          backgroundColor: tabBarBackground,
          // Left edge flush with screen, right edge rounded to match screenshot
          borderTopLeftRadius: 0,
          borderTopRightRadius: 36,
          borderBottomRightRadius: 36,
          overflow: "visible",
          shadowColor: "#0f172a",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.25,
          shadowRadius: 18,
        },
        headerShown: false,
        sceneStyle: {
          backgroundColor: colorScheme === "dark" ? "#020617" : "#f3f4f8",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon
              name={focused ? "home" : "home-outline"}
              label="Home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon
              name={focused ? "time" : "time-outline"}
              label="History"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="referral"
        options={{
          title: "Referral",
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon
              name={focused ? "people" : "people-outline"}
              label="Referral"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <CustomTabIcon
              name={focused ? "person" : "person-outline"}
              label="Profile"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
