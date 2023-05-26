import { getMatchingObject } from "../utils/object.utils";
import { SubscribeRequest } from "../api/types/subscribe";

/**
 * Forward requests and response directly to DerivWS.
 * @param data parsed data
 * @param ws websocket instance
 */
export const proxyInterceptor = async (data: object) => {
  try {
    if (
      getMatchingObject(data, "subscribe") &&
      (data as SubscribeRequest).subscribe === 1
    ) {
    } else {
    }
  } catch (error) {}
};
