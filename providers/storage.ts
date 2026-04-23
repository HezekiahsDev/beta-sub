import AsyncStorage from '@react-native-async-storage/async-storage';

async function getItem(key: string): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error(`Error reading from storage: ${key}`, e);
    return null;
  }
}

async function setItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.error(`Error saving to storage: ${key}`, e);
  }
}

async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error(`Error removing from storage: ${key}`, e);
  }
}

export default {
  getItem,
  setItem,
  removeItem,
};
