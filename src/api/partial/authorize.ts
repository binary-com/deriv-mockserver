import { WebSocket } from "ws";
import { deriv_api } from "../../config/deriv-api";
import { AuthorizeRequest } from "@deriv/api-types";

export const authorize = async (data: object, ws: WebSocket) => {
  try {
    const response = await deriv_api.authorize(data as AuthorizeRequest);
    ws.send(JSON.stringify(response));
  } catch (error) {
    ws.send(JSON.stringify(error));
  }
};
