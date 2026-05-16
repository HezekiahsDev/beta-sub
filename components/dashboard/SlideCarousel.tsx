import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  View,
} from "react-native";

type Slide = { Url: string; Status?: string };

export default function SlideCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView | null>(null);
  const width = Dimensions.get("window").width - 32; // account for px-4 padding in parent

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const next = Math.round(x / width);
    setIndex(next);
  };

  if (!slides || slides.length === 0) return null;

  const activeSlides = slides.filter(
    (s) => s.Status === "1" || s.Status === 1 || s.Status == null,
  );

  return (
    <View className="mb-6 overflow-hidden rounded-2xl bg-brand-700">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        ref={scrollRef}
      >
        {activeSlides.map((s, i) => (
          <Image
            key={`${s.Url}-${i}`}
            source={{ uri: s.Url }}
            style={{
              width,
              height: 160,
              borderRadius: 12,
              marginHorizontal: 16,
            }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <View className="flex-row items-center justify-center my-2">
        {activeSlides.map((_, i) => (
          <Pressable
            key={`dot-${i}`}
            onPress={() =>
              scrollRef.current?.scrollTo({ x: i * width, animated: true })
            }
            className={`mx-1 h-2 ${i === index ? "w-6 rounded-full bg-white" : "w-2 rounded-full bg-white/40"}`}
          />
        ))}
      </View>
    </View>
  );
}
