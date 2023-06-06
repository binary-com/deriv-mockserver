import { WebSocketServer } from "ws";
import { dataGenerator } from "./generator";
import { mockInterceptor } from "./interceptor";
import { generateError } from "./utils/error.utils";

const wss = new WebSocketServer({ port: 42069 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    try {
      const parsed_data = JSON.parse(data.toString());
      if (!("mock_id" in parsed_data)) {
        const error = generateError(
          {
            id: "mock_id",
            code: "MissingMockId",
            details: "Mock id must be present in each call",
          },
          parsed_data
        );
        return ws.send(JSON.stringify(error));
      }

      if ("generate_mock" in parsed_data) {
        dataGenerator(parsed_data, ws);
      }

      mockInterceptor(parsed_data, ws);
    } catch (e) {
      ws.send(
        JSON.stringify(
          generateError({
            id: "invalid_input",
            code: "InvalidInput",
            details: (e as Error).message,
          })
        )
      );
    }
  });

  ws.on("error", (error) => {
    ws.send(
      JSON.stringify(
        generateError({
          id: "server_error",
          code: "ServerError",
          details: error.message,
        })
      )
    );
  });
});
