import { v4 } from "uuid";
import { PartialArgs } from "../../interceptor/partial.interceptor";
import client_store, { Client } from "../../stores/client-store";
import { AuthorizeRequest, AuthorizeResponse } from "../types/authorize";
import { createNewDerivWSConnection } from "../../config/deriv-api.config";

export const authorize = async ({ data, ws }: PartialArgs) => {
  try {
    const { authorize, mock_server_id = "" } = data as AuthorizeRequest;

    const matching_client = client_store.find({
      token: authorize,
      id: mock_server_id,
    });

    if (!matching_client) {
      const deriv_api = createNewDerivWSConnection();
      const response = await deriv_api.send<AuthorizeResponse>({ authorize });

      const new_client: Client = {
        id: v4(),
        deriv_api,
        ws,
        account_info: response.authorize.account_list,
        token: authorize,
      };

      console.log(new_client);
      client_store.add(new_client);
      ws.send(JSON.stringify({ mock_server_id: new_client.id }));
    }
  } catch (e) {
    ws.send(JSON.stringify(e));
  }
};
