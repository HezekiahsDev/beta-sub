import React from 'react';
import { Image, View } from 'react-native';

type BrandLogoProps = {
  size?: number;
};

export function BrandLogo({ size = 56 }: BrandLogoProps) {
  return (
    <View style={{ width: size, height: size }} className="items-center justify-center">
      <Image
        source={require('../../assets/images/icon.png')}
        resizeMode="contain"
        style={{ width: size, height: size }}
      />
    </View>
  );
}
