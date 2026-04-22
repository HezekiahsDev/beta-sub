import { type Href, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandLogo } from '@/components/auth/BrandLogo';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding' as Href);
    }, 1300);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-[#efefef]" edges={['top', 'left', 'right', 'bottom']}>
      <View className="flex-1 items-center justify-center">
        <BrandLogo size={120} />
      </View>
    </SafeAreaView>
  );
}
