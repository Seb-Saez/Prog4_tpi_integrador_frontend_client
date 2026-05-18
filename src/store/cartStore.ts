import { create } from "zustand";
import type { Producto } from "../types/producto";

export type CartItem = {
  producto: Producto;
  cantidad: number;
};

type CartState = {
  items: CartItem[];
  addItem: (producto: Producto) => void;
  removeItem: (productoId: number) => void;
  updateCantidad: (productoId: number, cantidad: number) => void;
  clearCart: () => void;
  total: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (producto) => {
    const items = get().items;
    const existing = items.find((item) => item.producto.id === producto.id);
    if (existing) {
      set({
        items: items.map((item) =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { producto, cantidad: 1 }] });
    }
  },

  removeItem: (productoId) => {
    set({ items: get().items.filter((item) => item.producto.id !== productoId) });
  },

  updateCantidad: (productoId, cantidad) => {
    if (cantidad <= 0) {
      get().removeItem(productoId);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.producto.id === productoId ? { ...item, cantidad } : item
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  total: () => {
    return get().items.reduce(
      (acc, item) => acc + item.producto.precio_base * item.cantidad,
      0
    );
  },
}));
