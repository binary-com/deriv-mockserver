import { AuthorizeRequest, AuthorizeResponse } from '../types/authorise';
import { MappedAccount } from '../store/account.store';
import { InterceptedAPIHandler } from '../types/base';

export const authorize = async ({ data, ws, client }: InterceptedAPIHandler) => {
    const { deriv_api } = client;
    const { mock_id, authorize } = data as AuthorizeRequest;

    try {
        const response = (await deriv_api.send({ authorize })) as AuthorizeResponse;
        client.token = authorize;
        MappedAccount.add({
            mock_id: mock_id,
            accounts: response.authorize.account_list,
        });
        ws.send(JSON.stringify(response));
    } catch (e) {
        ws.send(JSON.stringify(e));
    }
};
