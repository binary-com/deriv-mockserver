import { RawData, WebSocket } from "ws";
import { partialInterceptor } from "./partial.interceptor";
import { fullInterceptor } from "./full.interceptor";
import { proxyInterceptor } from "./proxy.interceptor";
import { Endpoints } from "../config/endpoints.config";
import { getMatchingObject } from "../utils/object.utils";
import { GenericClientRequest } from "../api/types/base";

export type InterceptorArgs<T> = {
  data: GenericClientRequest;
  intercepted_property: T;
  ws: WebSocket;
};

/**
 * Switches which interceptor to use based on object properties sent by the client.
 * @param data
 * @returns
 */
export const mockInterceptor = (data: RawData, ws: WebSocket) => {
  const parsed_data = JSON.parse(data.toString()) as GenericClientRequest;
  const fully_intercepted_property = getMatchingObject(
    parsed_data,
    Endpoints.fully_intercepted
  ) as (typeof Endpoints.fully_intercepted)[number] | undefined;
  if (fully_intercepted_property) {
    return fullInterceptor({
      data: parsed_data,
      intercepted_property: fully_intercepted_property,
      ws,
    });
  }

  const partial_intercepted_property = getMatchingObject(
    parsed_data,
    Endpoints.partial_intercepted
  );
  if (partial_intercepted_property) {
    return partialInterceptor({
      data: parsed_data,
      intercepted_property:
        partial_intercepted_property as (typeof Endpoints.partial_intercepted)[number],
      ws,
    });
  }

  return proxyInterceptor({ data: parsed_data });
};
