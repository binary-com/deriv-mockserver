import { RawData, WebSocket } from "ws";
import { getMatchingKeys, validateRequestData } from "../utils/object.utils";
import { getMatchingSession } from "../store/client.store";
import { intercepted_endpoints } from "../config/endpoints";
import { authorize } from "../api/authorize";

export const mockInterceptor = (data: RawData, ws: WebSocket) => {
  const parsed_data = validateRequestData(data, ws);
  const client = getMatchingSession(parsed_data);

  const endpoint_type = getMatchingKeys(
    parsed_data,
    intercepted_endpoints
  ) as (typeof intercepted_endpoints)[number];

  switch (endpoint_type) {
    case "authorize":
      return authorize(data, ws, client);
    case "new_account_real":
    case "new_account_virtual":
    case "new_account_wallet":
    case "get_available_accounts_to_transfer":
    case "transfer_between_accounts":
    case "wallet_migration":
    default:
      break;
  }
};
