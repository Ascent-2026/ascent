import { create } from "zustand";

export type GameStore = {
  loadProgress: number;
  isLoaded: boolean;
  isGameStarted: boolean;
  setLoadProgress: (n: number) => void;
  setLoaded: (v: boolean) => void;
  startGame: () => void;
};

export const useGameStore = create<GameStore>((set) => ({
  loadProgress: 0,
  isLoaded: false,
  isGameStarted: false,
  setLoadProgress: (n) => set({ loadProgress: Math.min(100, Math.max(0, n)) }),
  setLoaded: (v) => set({ isLoaded: v }),
  startGame: () => set({ isGameStarted: true }),
}));
