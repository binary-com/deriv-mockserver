import { WebSocket as WebSocketClient } from "ws";
import InMemoryStore from "./in-memory.store";

export type Client = {
  id: string;
  wsc: WebSocketClient;
  ws: WebSocket;
};

const client_store = new InMemoryStore<Client>([]);

export default client_store;
