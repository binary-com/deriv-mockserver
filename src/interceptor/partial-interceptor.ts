import { WebSocket } from "ws";
import { Endpoints } from "../config/endpoints";
import { authorize } from "../api/partial/authorize";

/**
 *
 * @param data
 * @param api_type
 * @returns
 */
export const partialInterceptor = (
  data: object,
  api_type: (typeof Endpoints.partial_intercepted)[number],
  ws: WebSocket
) => {
  switch (api_type) {
    case "authorize":
      return authorize(data, ws);

    case "get_available_accounts_to_transfer":
    case "new_account_real":
    case "new_account_virtual":
    case "new_account_wallet":
    case "transfer_between_accounts":
      return;
  }
};
