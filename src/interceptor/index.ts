import { RawData } from "ws";
import { partialInterceptor } from "./partial-interceptor";
import { fullInterceptor } from "./full-interceptor";
import { proxyInterceptor } from "./proxy-interceptor";
import { Endpoints } from "../config/endpoints";

/**
 * Switches which interceptor to use based on object properties sent by the client.
 * @param data
 * @returns
 */
export const mockInterceptor = (data: RawData) => {
  const fully_intercepted_property = Endpoints.fully_intercepted.find(
    (property) => Object.keys(data).includes(property)
  );
  if (fully_intercepted_property) {
    return fullInterceptor(data, fully_intercepted_property);
  }

  const partial_intercepted_property = Endpoints.partial_intercepted.find(
    (property) => Object.keys(data).includes(property)
  );
  if (partial_intercepted_property) {
    return partialInterceptor(data, partial_intercepted_property);
  }

  return proxyInterceptor(data);
};
