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
  const { authorize } = data as AuthorizeRequest;

  try {
    const response = (await deriv_api.send(data)) as AuthorizeResponse;
    client.token = authorize;
  } catch (e) {
    ws.send(JSON.stringify(e));
  }
};
