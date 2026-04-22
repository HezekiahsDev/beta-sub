// Force light theme across the app for now to match the design reference.
// This replaces the platform/system-aware hook and always returns 'light'.
export function useColorScheme(): "light" | "dark" {
  return "light";
}
