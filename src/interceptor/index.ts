import { RawData } from "ws";
import { partialInterceptor } from "./partial.interceptor";
import { fullInterceptor } from "./full.interceptor";
import { proxyInterceptor } from "./proxy.interceptor";
import { Endpoints } from "../config/endpoints.config";
import { getMatchingObject } from "../utils/object.utils";
import { GenericClientRequest } from "../api/types/base";

/**
 * Switches which interceptor to use based on object properties sent by the client.
 * @param data
 * @returns
 */
export const mockInterceptor = (data: RawData) => {
  const parsed_data = JSON.parse(data.toString()) as GenericClientRequest;
  const fully_intercepted_property = getMatchingObject(
    parsed_data,
    Endpoints.fully_intercepted
  );
  if (fully_intercepted_property) {
    return fullInterceptor(parsed_data, fully_intercepted_property);
  }

  const partial_intercepted_property = getMatchingObject(
    parsed_data,
    Endpoints.partial_intercepted
  );
  if (partial_intercepted_property) {
    return partialInterceptor(parsed_data, partial_intercepted_property);
  }

  return proxyInterceptor(parsed_data);
};
