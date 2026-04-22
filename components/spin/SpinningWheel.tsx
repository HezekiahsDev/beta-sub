import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const WHEEL_SIZE = width * 0.85;

export interface SpinReward {
  id: number;
  label: string;
  type: "cash" | "data" | "lose";
  value: string;
  color: string;
}

export const SPIN_REWARDS: SpinReward[] = [
  { id: 0, label: "2GB Data", type: "data", value: "2GB", color: "#1f2aba" },
  { id: 1, label: "₦500 Airtime", type: "cash", value: "₦500", color: "#1f2aba" },
  { id: 2, label: "Free Spin", type: "data", value: "1 Spin", color: "#1f2aba" },
  { id: 3, label: "₦1000 Bonus", type: "cash", value: "₦1000", color: "#1f2aba" },
  { id: 4, label: "₦300 Airtime", type: "cash", value: "₦300", color: "#1f2aba" },
  { id: 5, label: "Try again", type: "lose", value: "0", color: "#1f2aba" },
  { id: 6, label: "500MB Data", type: "data", value: "500MB", color: "#1f2aba" },
  { id: 7, label: "₦100 Bonus", type: "cash", value: "₦100", color: "#1f2aba" },
];

interface SpinningWheelProps {
  onFinished: (reward: SpinReward) => void;
  spinning: boolean;
}

export function SpinningWheel({ onFinished, spinning }: SpinningWheelProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (spinning) {
      const extraSpins = 5 + Math.floor(Math.random() * 5); // 5-10 full rotations
      const targetIndex = Math.floor(Math.random() * SPIN_REWARDS.length);
      const segmentAngle = 360 / SPIN_REWARDS.length;
      
      // Calculate target rotation (clockwise)
      // Alignment adjustments for top pointer
      const targetRotation = 360 * extraSpins + (360 - (targetIndex * segmentAngle));
      
      rotation.value = 0; // Reset
      rotation.value = withTiming(
        targetRotation,
        {
          duration: 5000,
          easing: Easing.out(Easing.back(0.5)),
        },
        (finished) => {
          if (finished) {
            runOnJS(onFinished)(SPIN_REWARDS[targetIndex]);
          }
        }
      );
    }
  }, [spinning]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View className="items-center justify-center py-10">
      {/* Pointer Container */}
      <View className="absolute top-[35px] z-20 items-center">
        <View 
            style={{
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 20,
                borderRightWidth: 20,
                borderBottomWidth: 40,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: '#1f2aba',
                transform: [{ rotate: '180deg' }]
            }}
        />
        {/* Pointer Inner Line/Shadow */}
        <View 
            style={{
                position: 'absolute',
                top: 5,
                width: 0,
                height: 0,
                backgroundColor: 'transparent',
                borderStyle: 'solid',
                borderLeftWidth: 15,
                borderRightWidth: 15,
                borderBottomWidth: 30,
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderBottomColor: '#ffffff',
                transform: [{ rotate: '180deg' }]
            }}
        />
      </View>

      {/* Wheel Container with outer shadow and border */}
      <View 
        style={{
            width: WHEEL_SIZE + 20,
            height: WHEEL_SIZE + 20,
            borderRadius: (WHEEL_SIZE + 20) / 2,
            borderWidth: 4,
            borderColor: '#1f2aba',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff'
        }}
      >
        {/* Layer 1: Clipped Background Segments */}
        <Animated.View
            style={[
            animatedStyle,
            {
                width: WHEEL_SIZE,
                height: WHEEL_SIZE,
                borderRadius: WHEEL_SIZE / 2,
                backgroundColor: "#ffffff",
                overflow: "hidden", // Specifically for segments
            },
            ]}
        >
            {SPIN_REWARDS.map((reward, index) => {
                const angle = (360 / SPIN_REWARDS.length) * (index - 0.5);
                return (
                    <View
                    key={`seg-${reward.id}`}
                    style={[
                        styles.segment,
                        {
                        transform: [
                            { rotate: `${angle}deg` },
                            { skewY: `${90 - 360 / SPIN_REWARDS.length}deg` },
                        ],
                        backgroundColor: index % 2 === 0 ? "#1f2aba" : "#ffffff",
                        },
                    ]}
                    />
                );
            })}
        </Animated.View>

        {/* Layer 2: Unclipped Labels Orbit (Rotates with wheel) */}
        <Animated.View
            pointerEvents="none"
            style={[
                animatedStyle,
                StyleSheet.absoluteFill,
                {
                    width: WHEEL_SIZE,
                    height: WHEEL_SIZE,
                    top: 10, // Adjust for parent padding
                    left: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                }
            ]}
        >
            {SPIN_REWARDS.map((reward, index) => {
                const angle = (360 / SPIN_REWARDS.length) * index;
                const isBlue = index % 2 === 0;
                const orbitRadius = (WHEEL_SIZE / 2) * 0.7;
                
                const rad = ((angle - 90) * Math.PI) / 180;
                const x = (WHEEL_SIZE / 2) + orbitRadius * Math.cos(rad);
                const y = (WHEEL_SIZE / 2) + orbitRadius * Math.sin(rad);

                return (
                    <View
                        key={`lbl-${reward.id}`}
                        style={{
                            position: 'absolute',
                            left: x - 40,
                            top: y - 40,
                            width: 80,
                            height: 80,
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: [{ rotate: `${angle}deg` }],
                        }}
                    >
                        <Ionicons 
                            name={
                                reward.label.toLowerCase().includes('data') ? 'phone-portrait' : 
                                reward.label.toLowerCase().includes('airtime') ? 'call' :
                                reward.label.toLowerCase().includes('bonus') ? 'gift' :
                                reward.label.toLowerCase().includes('free') ? 'sync' : 'sad'
                            } 
                            size={24} 
                            color={isBlue ? "#ffffff" : "#1f2aba"} 
                        />
                        <Text 
                            style={{ 
                                color: isBlue ? "#ffffff" : "#1f2aba",
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 10,
                                marginTop: 2,
                                width: 70
                            }}
                        >
                            {reward.label.replace(' ', '\n')}
                        </Text>
                    </View>
                );
            })}
        </Animated.View>
        
        {/* Center Pivot */}
        <View 
            className="absolute z-30 bg-white items-center justify-center border-4 border-brand-700"
            style={{
                width: 60,
                height: 60,
                borderRadius: 30,
            }}
        >
            <View 
                className="bg-brand-700"
                style={{ width: 10, height: 10, borderRadius: 5 }}
            />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  segment: {
    position: "absolute",
    width: WHEEL_SIZE / 2,
    height: WHEEL_SIZE / 2,
    left: WHEEL_SIZE / 2,
    top: WHEEL_SIZE / 2,
    transformOrigin: "0 0",
  },
});
