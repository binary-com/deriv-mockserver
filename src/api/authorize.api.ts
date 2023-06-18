import { AuthorizeRequest } from '../types/authorize';
import { InterceptedAPIHandler } from '../types/base';
import { handleGenericError } from '../utils/error.utils';

export const authorize = async ({ data, ws, session }: InterceptedAPIHandler) => {
    const { authorize, req_id } = data as AuthorizeRequest;
    const matching_account = session.getAccountByToken(authorize);
    if (!matching_account) {
        return handleGenericError('invalid_token', 'Invalid token.', ws, {
            authorize: '<not shown>',
            req_id,
        });
    }

    const response = {
        authorize: {
            account_list: session.accounts,
            balance: 10046.18,
            country: 'id',
            currency: 'USD',
            email: 'a@a.com',
            fullname: '  ',
            is_virtual: 1,
            landing_company_fullname: 'Deriv Limited',
            landing_company_name: 'virtual',
            local_currencies: {
                IDR: {
                    fractional_digits: 2,
                },
            },
            loginid: 'VRTC6817101',
            preferred_language: 'EN',
            scopes: ['read', 'trade', 'trading_information', 'payments', 'admin'],
            trading: {},
            upgradeable_landing_companies: ['svg'],
            user_id: 90930015,
        },
        echo_req: {
            authorize: '<not shown>',
            req_id,
        },
        msg_type: 'authorize',
        req_id,
    };

    ws.send(JSON.stringify(response));
};
