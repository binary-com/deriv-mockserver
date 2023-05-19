import { RawData, WebSocket } from "ws";
import { partialInterceptor } from "./partial.interceptor";
import { fullInterceptor } from "./full.interceptor";
import { proxyInterceptor } from "./proxy.interceptor";
import { Endpoints } from "../config/endpoints";
import { getMatchingObject } from "../utils/object.utils";

/**
 * Switches which interceptor to use based on object properties sent by the client.
 * @param data
 * @returns
 */
export const mockInterceptor = (data: RawData, ws: WebSocket) => {
  const parsed_data = JSON.parse(data.toString());
  const fully_intercepted_property = getMatchingObject(
    parsed_data,
    Endpoints.fully_intercepted
  );
  if (fully_intercepted_property) {
    return fullInterceptor(parsed_data, fully_intercepted_property, ws);
  }

  const partial_intercepted_property = getMatchingObject(
    parsed_data,
    Endpoints.partial_intercepted
  );
  if (partial_intercepted_property) {
    return partialInterceptor(parsed_data, partial_intercepted_property, ws);
  }

  return proxyInterceptor(parsed_data, ws);
};
