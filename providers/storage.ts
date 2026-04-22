import AsyncStorage from '@react-native-async-storage/async-storage';

const memory = new Map<string, string>();

async function getItem(key: string): Promise<string | null> {
  try {
    const val = await AsyncStorage.getItem(key);
    return val;
  } catch (e) {
    // Native module not available (Expo Go), fall back to memory
    return memory.has(key) ? (memory.get(key) as string) : null;
  }
}

async function setItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    memory.set(key, value);
  }
}

async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    memory.delete(key);
  }
}

export default {
  getItem,
  setItem,
  removeItem,
};
