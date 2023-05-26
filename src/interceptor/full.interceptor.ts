import { WebSocket } from "ws";

/**
 * Intercept requests and fully handles the response to the client without
 * connecting to DerivWS
 * @param data parsed data
 * @param api_type endpoint
 * @param ws websocket instance
 * @returns
 */
export const fullInterceptor = (data: object, api_type: string) => {
  switch (api_type) {
    case "wallet_migration":
      return;
  }
};
