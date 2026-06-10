import { create } from "zustand";

type WsStatus = "disconnected" | "connecting" | "connected" | "error";

interface PedidoWsStore {
  status: WsStatus;
  setStatus: (s: WsStatus) => void;
}

export const usePedidoWsStore = create<PedidoWsStore>((set) => ({
  status: "disconnected",
  setStatus: (status) => set({ status }),
}));
