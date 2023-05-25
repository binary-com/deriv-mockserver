import { WebSocket } from "ws";
import { deriv_api } from "../../config/deriv-api.config";

export const authorize = async (data: object, ws: WebSocket) => {
  try {
    const response = await deriv_api.send(data);
    ws.send(JSON.stringify(response));
  } catch (error) {
    ws.send(JSON.stringify(error));
  }
};
