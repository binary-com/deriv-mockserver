import { RawData, WebSocket } from "ws";
import { getMatchingKeys } from "../utils/object.utils";
import { getMatchingSession } from "../store/client.store";
import { intercepted_endpoints } from "../config/endpoints";
import { authorize } from "../api/authorize.api";
import { generateError } from "../utils/error.utils";

export const mockInterceptor = (data: RawData, ws: WebSocket) => {
  const parsed_data = JSON.parse(data.toString());
  if (!("mock_id" in parsed_data)) {
    const error = generateError(
      {
        id: "mock_id",
        code: "MissingMockId",
        details: "Mock id must be present in each call",
      },
      parsed_data
    );
    return ws.send(JSON.stringify(error));
  }

  const client = getMatchingSession(parsed_data);

  const endpoint_type = getMatchingKeys(
    parsed_data,
    intercepted_endpoints
  ) as (typeof intercepted_endpoints)[number];

  switch (endpoint_type) {
    case "authorize":
      return authorize({ data: parsed_data, ws, client });
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
