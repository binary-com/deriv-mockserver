import { DerivApi, createDerivWSInstance } from "../config/deriv-api";

export type Client = {
  id: string;
  token?: string;
  deriv_api: DerivApi;
};

export const client_list: Client[] = [];

/**
 * Gets matching session, if not available create a new client session.
 * @param parsed_data Parsed data from client
 * @returns {Client}
 */
export const getMatchingSession = (parsed_data: any): Client => {
  const { mock_id = "" } = parsed_data;
  const matching_client = client_list.find((c) => c.id === mock_id);
  if (!matching_client) {
    return createClientSession(mock_id);
  }
  return matching_client;
};

/**
 * Create client session based on sent id.
 * @param mock_id Id sent from client
 * @returns {Client}
 */
export const createClientSession = (mock_id: string): Client => {
  const new_client = {
    id: mock_id,
    deriv_api: createDerivWSInstance(),
  };
  client_list.push(new_client);
  return new_client;
};
