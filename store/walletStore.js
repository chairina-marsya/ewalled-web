import { create } from 'zustand'

export const useWalletStore = create((set) => ({
  wallet: null,
  setWallet: (userData) => set({ wallet: userData }),
  clearWallet: () => set({ wallet: null }),
}))
