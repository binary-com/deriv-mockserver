import InMemoryStore from "./in-memory.store";
import { DerivApi } from "../config/deriv-api.config";

export type Client = {
  id: string;
  deriv_api: DerivApi;
  ws: WebSocket;
  account_info?: {};
};

const client_store = new InMemoryStore<Client>([]);

export default client_store;
