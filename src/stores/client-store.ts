import { WebSocket as WebSocketClient } from "ws";
import InMemoryStore from "./in-memory.store";
import { DerivApi } from "../config/deriv-api.config";

export type Client = {
  id: string;
  wss: WebSocketClient;
  deriv_api: DerivApi;
};

const client_store = new InMemoryStore<Client>([]);

export default client_store;
