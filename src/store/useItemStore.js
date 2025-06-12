// store/useItemStore.js
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useItemStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set({ items: [...get().items, item] });
      },
      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item.id !== itemId),
        });
      },
    }),
    {
      name: 'item-storage',
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: AsyncStorage.removeItem,
      },
    }
  )
);
