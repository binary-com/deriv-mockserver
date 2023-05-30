import WebSocket from "ws";
import { Client } from "../store/client.store";
import { AuthorizeRequest, AuthorizeResponse } from "../types/authorise";

/**
 * Handles the authorise intercepted call
 * @param client
 * @param ws
 */
export const authorize = async (
  data: object,
  ws: WebSocket,
  client: Client
) => {
  const { deriv_api } = client;
  const { mock_id, authorize } = data as AuthorizeRequest;

  try {
    const response = (await deriv_api.send({ authorize })) as AuthorizeResponse;
    client.token = authorize;
    ws.send(JSON.stringify(response));
  } catch (e) {
    ws.send(JSON.stringify(e));
  }
};
