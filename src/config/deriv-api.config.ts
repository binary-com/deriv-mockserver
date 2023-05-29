import WebSocket from "ws";
// @ts-ignore
import DerivAPIBasic from "@deriv/deriv-api/dist/DerivAPIBasic";
import { Observable } from "rxjs";

export type DerivApi = {
  send: <T extends object>(...requestData: unknown[]) => Promise<T>;
  subscribe: <T extends object>(...requestData: unknown[]) => Observable<T>;
};

/**
 * Generates a new websocket connection for each uniquely connected client.
 * @returns A new WebSocket instance
 */
export const createNewDerivWSConnection = (): DerivApi => {
  const deriv_ws = new WebSocket(
    "wss://ws.binaryws.com/websockets/v3?app_id=1089"
  );

  return new DerivAPIBasic({ connection: deriv_ws });
};
