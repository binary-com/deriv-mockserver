import WebSocket from "ws";
// @ts-ignore
import DerivAPI from "@deriv/deriv-api";

const deriv_ws = new WebSocket(
  "wss://ws.binaryws.com/websockets/v3?app_id=1089"
);

const deriv_api = new DerivAPI({ connection: deriv_ws });

export const proxyInterceptor = (data: unknown) => {};
