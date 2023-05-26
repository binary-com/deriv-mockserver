import { WebSocketServer } from "ws";
import { mockInterceptor } from "./interceptor";
import { nanoid } from "nanoid";
import { createNewDerivWSConnection } from "./config/deriv-api.config";
import client_store from "./stores/client-store";

const wss = new WebSocketServer({ port: 42069 });

wss.on("connection", (ws) => {
  const new_client = {
    id: nanoid(),
    wsc: ws,
    ws: createNewDerivWSConnection(),
  };

  client_store.add(new_client);
  console.log(
    `Client ${new_client.id} is connected to WS. Total connected: ${client_store.entities.length}`
  );

  ws.on("message", (data) => mockInterceptor(data));
});
