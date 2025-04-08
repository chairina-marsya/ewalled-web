import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useWalletStore = create(
  persist(
    (set) => ({
      wallet: null,
      setWallet: (userData) => set({ wallet: userData }),
      clearWallet: () => set({ wallet: null }),
    }),
    {
      name: 'wallet-storage', // nama key di localStorage atau AsyncStorage (React Native)
      // opsional: kustom storage
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
)
