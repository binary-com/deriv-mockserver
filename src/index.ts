import { WebSocketServer } from "ws";
import { v4 as deez } from "uuid";
import { mockInterceptor } from "./interceptor";
import { createNewDerivWSConnection } from "./config/deriv-api.config";
import client_store from "./stores/client-store";

const wss = new WebSocketServer({ port: 42069 });

wss.on("connection", (ws) => {
  const new_client = {
    id: deez(),
    wss: ws,
    deriv_api: createNewDerivWSConnection(),
  };

  client_store.add(new_client);
  console.log(
    `Client ${new_client.id} is connected to WS. Total connected: ${client_store.entities.length}`
  );
  ws.send(
    JSON.stringify({
      mock_server_id: new_client.id,
    })
  );

  ws.on("message", (data) => mockInterceptor(data));
});
