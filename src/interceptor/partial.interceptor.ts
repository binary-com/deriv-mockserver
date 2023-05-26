import { WebSocket } from "ws";
import { authorize } from "../api/partial/authorize";

/**
 * Intercepts request, sends to DerivWS and modify the response before sending
 * data to the client.
 * @param data parsed data
 * @param api_type endpoint
 * @param ws websocket instance
 * @returns
 */
export const partialInterceptor = (data: object, api_type: string) => {
  switch (api_type) {
    case "authorize":
      return authorize(data);

    case "get_available_accounts_to_transfer":
    case "new_account_real":
    case "new_account_virtual":
    case "new_account_wallet":
    case "transfer_between_accounts":
    default:
      return;
  }
};
