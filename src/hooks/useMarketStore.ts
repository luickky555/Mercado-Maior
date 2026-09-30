import { create } from "zustand";
import { mockProducts } from "@/data/products";
import type { Product } from "@/types";

interface MarketStore {
  products: Product[];
  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useMarketStore = create<MarketStore>((set, get) => ({
  products: mockProducts,

  favoriteIds: [],

  toggleFavorite: (productId) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(productId)
        ? state.favoriteIds.filter(
            (id) => id !== productId,
          )
        : [...state.favoriteIds, productId],
    })),

  isFavorite: (productId) =>
    get().favoriteIds.includes(productId),
}));