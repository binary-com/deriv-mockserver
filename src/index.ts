import { WebSocketServer } from "ws";
import { mockInterceptor } from "./interceptor";
import client_store from "./stores/client-store";
import { generateNewSession } from "./utils/object.utils";

const wss = new WebSocketServer({ port: 42069 });

wss.on("connection", (ws) => {
  const new_client = generateNewSession(ws);

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
