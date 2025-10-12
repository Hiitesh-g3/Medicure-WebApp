import { create } from 'zustand'

export const useCurrentPage = create((set) => ({
  currentPage : "home",
  setCurrentPage: (page) => set({currentPage : page}),
}))

