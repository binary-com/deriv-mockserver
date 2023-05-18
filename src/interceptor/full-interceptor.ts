import { WebSocket } from "ws";
import { Endpoints } from "../config/endpoints";

/**
 *
 * @param data
 * @param api_type
 * @returns
 */
export const fullInterceptor = (
  data: unknown,
  api_type: (typeof Endpoints.fully_intercepted)[number],
  ws: WebSocket
) => {
  switch (api_type) {
    case "wallet_migration":
      return;
  }
};
