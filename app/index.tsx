import { Redirect, type Href } from 'expo-router';

import { useFlow } from '@/providers/FlowProvider';

export default function IndexScreen() {
  const { isReady, onboardingComplete, isAuthenticated } = useFlow();

  if (!isReady) {
    return null;
  }

  if (!onboardingComplete) {
    return <Redirect href={'/splash' as Href} />;
  }

  if (!isAuthenticated) {
    return <Redirect href={'/login' as Href} />;
  }

  return <Redirect href="/(tabs)" />;
}
