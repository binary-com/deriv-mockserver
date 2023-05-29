import WebSocket from "ws";
import { v4 } from "uuid";
import { createNewDerivWSConnection } from "../config/deriv-api.config";

/**
 * Generate new session to distinguish different
 * @param ws
 * @returns
 */
export const generateNewSession = (ws: WebSocket) => {
  return {
    id: v4(),
    wss: ws,
    deriv_api: createNewDerivWSConnection(),
  };
};

/**
 * Returns first key match of the keys argument,
 * @param data object to search for matching key
 * @param keys array of keys or a string key
 * @returns first matching key
 */

export const getMatchingObject = (
  data: object,
  keys: string | readonly string[] | string[]
) => {
  if (Array.isArray(keys)) {
    return keys.find((key) => Object.keys(data).includes(key));
  } else {
    return Object.keys(data).find((property) => property === keys);
  }
};
