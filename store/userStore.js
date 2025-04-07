import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user-storage', // nama key di localStorage atau AsyncStorage (React Native)
      // opsional: kustom storage
      // storage: createJSONStorage(() => sessionStorage),
    }
  )
)
