import { endpoints } from "@/lib/api";
import storage from "@/providers/storage";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type FlowContextValue = {
  isReady: boolean;
  onboardingComplete: boolean;
  isAuthenticated: boolean;
  userToken: string | null;
  user: any;
  completeOnboarding: () => Promise<void>;
  signIn: (token?: string, initialUser?: any) => Promise<void>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const ONBOARDING_KEY = "flow:onboarding_complete";
const AUTH_TOKEN_KEY = "flow:auth_token";

const FlowContext = createContext<FlowContextValue | undefined>(undefined);

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const isAuthenticated = !!userToken;

  const fetchUserDetails = async (token: string) => {
    try {
      const response = await fetch(endpoints.userDetails, {
        method: "POST",
        headers: {
          "Authorization Token": token,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        // Handle invalid token
        setUserToken(null);
        await storage.removeItem(AUTH_TOKEN_KEY);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    let mounted = true;

    async function hydrateFlow() {
      try {
        const [onboardingValue, tokenValue] = await Promise.all([
          storage.getItem(ONBOARDING_KEY),
          storage.getItem(AUTH_TOKEN_KEY),
        ]);

        if (!mounted) return;

        setOnboardingComplete(onboardingValue === "true");
        setUserToken(tokenValue);

        if (tokenValue) {
          await fetchUserDetails(tokenValue);
        }
      } catch (error) {
        console.error("Failed to hydrate flow state:", error);
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
      userToken,
      user,
      completeOnboarding: async () => {
        setOnboardingComplete(true);
        await storage.setItem(ONBOARDING_KEY, "true");
      },
      signIn: async (token?: string, initialUser?: any) => {
        setUserToken(token ?? null);

        if (token) {
          await storage.setItem(AUTH_TOKEN_KEY, token);
        }

        // If we have user data from the login response, set it immediately
        // for faster UI, then refresh from the server to ensure freshness.
        if (initialUser) {
          setUser(initialUser);
        }

        if (token) {
          await fetchUserDetails(token);
        }
      },
      signOut: async () => {
        setUserToken(null);
        setUser(null);
        await storage.removeItem(AUTH_TOKEN_KEY);
      },
      refreshUser: async () => {
        if (userToken) {
          await fetchUserDetails(userToken);
        }
      },
    }),
    [isReady, onboardingComplete, isAuthenticated, userToken, user],
  );

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow() {
  const context = useContext(FlowContext);

  if (!context) {
    throw new Error("useFlow must be used within FlowProvider");
  }

  return context;
}
