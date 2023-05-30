import { RawData, WebSocket } from "ws";
import { generateError } from "./error.utils";

/**
 * Returns first key match of the keys argument,
 * @param data object to search for matching key
 * @param keys array of keys or a string key
 * @returns first matching key
 */
export const getMatchingKeys = (
  data: object,
  keys: string | readonly string[] | string[]
) => {
  if (Array.isArray(keys)) {
    return keys.find((key) => Object.keys(data).includes(key));
  } else {
    return Object.keys(data).find((property) => property === keys);
  }
};

/**
 *
 * @param data
 * @param ws
 * @returns
 */
export const validateRequestData = (data: RawData, ws: WebSocket) => {
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
  return parsed_data;
};
