import { create } from "zustand";
import type { Product } from "@/types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (product, quantity = 1) =>
    set((state) => {
      const safeQuantity = Math.max(1, quantity);

      const existing = state.items.find(
        (item) => item.product.id === product.id,
      );

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + safeQuantity,
                }
              : item,
          ),
        };
      }

      return {
        items: [
          ...state.items,
          {
            product,
            quantity: safeQuantity,
          },
        ],
      };
    }),

  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.product.id !== productId,
      ),
    })),

  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter(
              (item) => item.product.id !== productId,
            )
          : state.items.map((item) =>
              item.product.id === productId
                ? {
                    ...item,
                    quantity,
                  }
                : item,
            ),
    })),

  clearCart: () => set({ items: [] }),
}));