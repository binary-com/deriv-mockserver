import { Client } from "../store/client.store";
import { GenericRequest } from "../types/base";

export const proxyConnection = async (
  data: object,
  ws: WebSocket,
  client: Client
) => {
  const { deriv_api } = client;
  const { mock_id, ...forwarded_data } = data as GenericRequest;

  try {
    const response = await deriv_api.send({ ...forwarded_data });
    ws.send(JSON.stringify(response));
  } catch (e) {
    ws.send(JSON.stringify(e));
  }
};
