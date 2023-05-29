import { getMatchingObject } from "../utils/object.utils";
import { SubscribeRequest } from "../api/types/subscribe";
import client_store from "../stores/client-store";
import { InterceptorArgs } from ".";

/**
 * Forward requests and response directly to DerivWS.
 * @param data parsed data
 * @param ws websocket instance
 */
export const proxyInterceptor = async ({
  data,
}: Pick<InterceptorArgs<string>, "data">) => {
  try {
    const { mock_server_id = "", ...filtered_request } = data;
    const client = client_store.find({ id: mock_server_id });

    if (!client) return;

    if (
      getMatchingObject(data, "subscribe") &&
      (data as SubscribeRequest).subscribe === 1
    ) {
      const observable = client.deriv_api.subscribe(filtered_request);
      observable.subscribe((data) => client.ws.send(JSON.stringify(data)));
    } else {
      const response = await client.deriv_api.send(filtered_request);
      client.ws.send(JSON.stringify(response));
    }
  } catch (error) {}
};
