import { WebSocketServer } from "ws";
import { mockInterceptor } from "./interceptor";

const wss = new WebSocketServer({ port: 42069 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => mockInterceptor(data));
});
