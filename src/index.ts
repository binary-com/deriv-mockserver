import { WebSocketServer } from "ws";
import { mockInterceptor } from "./interceptor";
import { generateError } from "./utils/error.utils";

const wss = new WebSocketServer({ port: 42069 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => mockInterceptor(data, ws));
  ws.on("error", (error) => {
    ws.send(
      JSON.stringify(
        generateError(
          {
            id: "server_error",
            code: "ServerError",
            details: "Something is not right",
          },
          {}
        )
      )
    );
  });
});
