import { getMatchingObject } from "../utils/object.utils";
import { SubscribeRequest } from "../api/types/subscribe";
import client_store from "../stores/client-store";
import { InterceptorArgs } from ".";
import { deriv_singleton } from "../config/deriv-api.config";

/**
 * Forward requests and response directly to DerivWS.
 * @param data parsed data
 * @param ws websocket instance
 */
export const proxyInterceptor = async ({
  data,
  ws,
}: Omit<InterceptorArgs<string>, "intercepted_property">) => {
  try {
    const { mock_server_id = "", ...filtered_request } = data;
    const client = client_store.find({ id: mock_server_id });
    const api_instance = client ? client.deriv_api : deriv_singleton;
    const ws_instance = client ? client.ws : ws;

    if (
      getMatchingObject(data, "subscribe") &&
      (data as SubscribeRequest).subscribe === 1
    ) {
      const observable = api_instance.subscribe(filtered_request);
      observable.subscribe((data) => ws_instance.send(JSON.stringify(data)));
    } else {
      const response = await api_instance.send(filtered_request);
      ws_instance.send(JSON.stringify(response));
    }
  } catch (error) {}
};
