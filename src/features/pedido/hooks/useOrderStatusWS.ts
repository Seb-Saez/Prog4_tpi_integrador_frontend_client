import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { env } from "@/config/env";
import { usePedidoWsStore } from "../store/pedidoWsStore";

const WS_URL = env.wsUrl;
const RECONNECT_BASE_MS = 2_000;
const RECONNECT_MAX_MS = 30_000;

export function useOrderStatusWS(pedidoId: number | undefined) {
  const setStatus = usePedidoWsStore((s) => s.setStatus);
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const subscribedRef = useRef(false);

  const scheduleReconnect = () => {
    const delay = Math.min(
      RECONNECT_BASE_MS * 2 ** retryRef.current,
      RECONNECT_MAX_MS,
    );
    retryRef.current += 1;
    timerRef.current = setTimeout(connect, delay);
  };

  const connect = () => {
    // evita que un timeout stale de un socket anterior mate al nuevo
    clearTimeout(timerRef.current);
    wsRef.current?.close();
    setStatus("connecting");
    subscribedRef.current = false;

    try {
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        retryRef.current = 0;
        setStatus("connected");

        if (pedidoId) {
          ws.send(JSON.stringify({ action: "subscribe-order", order_id: pedidoId }));
          subscribedRef.current = true;
        }
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.event === "estado_cambiado") {
            if (pedidoId !== undefined && data.pedido_id === pedidoId) {
              queryClient.invalidateQueries({ queryKey: ["pedido", pedidoId] });
            }
            queryClient.invalidateQueries({ queryKey: ["mis-pedidos"] });
          }
        } catch {
          // ignore malformed messages
        }
      };

      ws.onclose = () => {
        setStatus("disconnected");
        // solo reconecta si este socket sigue siendo el actual;
        // si fue cerrado por unmount/reconnect intencional, no reintentamos
        if (wsRef.current === ws) {
          scheduleReconnect();
        }
      };

      ws.onerror = () => {
        setStatus("error");
      };
    } catch {
      setStatus("error");
      scheduleReconnect();
    }
  };

  useEffect(() => {
    connect();

    return () => {
      clearTimeout(timerRef.current);

      if (wsRef.current && subscribedRef.current && pedidoId) {
        try {
          wsRef.current.send(
            JSON.stringify({ action: "unsubscribe-order", order_id: pedidoId }),
          );
        } catch {
          // ignore send on closing socket
        }
      }

      wsRef.current?.close();
      wsRef.current = null; // null ref para que onclose stale no reintente
    };
    // reconnect when pedidoId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pedidoId]);

  return {
    reconnect: connect,
    status: usePedidoWsStore((s) => s.status),
  };
}
