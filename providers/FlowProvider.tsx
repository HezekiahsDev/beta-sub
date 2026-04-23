import storage from '@/providers/storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type FlowContextValue = {
  isReady: boolean;
  onboardingComplete: boolean;
  isAuthenticated: boolean;
  completeOnboarding: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const ONBOARDING_KEY = 'flow:onboarding_complete';
const AUTH_KEY = 'flow:is_authenticated';

const FlowContext = createContext<FlowContextValue | undefined>(undefined);

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function hydrateFlow() {
      try {
        const [onboardingValue, authValue] = await Promise.all([
          storage.getItem(ONBOARDING_KEY),
          storage.getItem(AUTH_KEY),
        ]);

        if (!mounted) return;

        setOnboardingComplete(onboardingValue === 'true');
        setIsAuthenticated(authValue === 'true');
      } catch (error) {
        console.error('Failed to hydrate flow state:', error);
      } finally {
        if (mounted) {
          setIsReady(true);
        }
      }
    }

    hydrateFlow();

    return () => {
      mounted = false;
    };
  }, []);

  const value = useMemo<FlowContextValue>(
    () => ({
      isReady,
      onboardingComplete,
      isAuthenticated,
      completeOnboarding: async () => {
        setOnboardingComplete(true);
        await storage.setItem(ONBOARDING_KEY, 'true');
      },
      signIn: async () => {
        setIsAuthenticated(true);
        await storage.setItem(AUTH_KEY, 'true');
      },
      signOut: async () => {
        setIsAuthenticated(false);
        await storage.removeItem(AUTH_KEY);
      },
    }),
    [isReady, onboardingComplete, isAuthenticated]
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const context = useContext(FlowContext);

  if (!context) {
    throw new Error('useFlow must be used within FlowProvider');
  }

  return context;
}
