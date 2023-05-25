import { WebSocket } from "ws";
import { deriv_api } from "../config/deriv-api.config";
import { getMatchingObject } from "../utils/object.utils";
import { SubscribeRequest } from "../api/types/subscribe";

/**
 * Forward requests and response directly to DerivWS.
 * @param data parsed data
 * @param ws websocket instance
 */
export const proxyInterceptor = async (data: object, ws: WebSocket) => {
  try {
    if (
      getMatchingObject(data, "subscribe") &&
      (data as SubscribeRequest).subscribe === 1
    ) {
      const api_observable = deriv_api.subscribe(data);
      api_observable.subscribe((subsribed_data) => {
        ws.send(JSON.stringify(subsribed_data));
      });
    } else {
      const response = await deriv_api.send(data);
      ws.send(JSON.stringify(response));
    }
  } catch (error) {
    ws.send(JSON.stringify(error));
  }
};
