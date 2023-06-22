import { AuthorizeRequest } from '../types/authorize';
import { InterceptedAPIHandler } from '../types/base.type';
import { handleGenericError } from '../utils/error.utils';

export const authorize = async ({ data, ws, session }: InterceptedAPIHandler) => {
    const { authorize, req_id } = data as AuthorizeRequest;
    const matching_account = session.authorize(authorize);
    if (!matching_account) {
        return handleGenericError('invalid_token', 'Invalid token.', ws, {
            authorize: '<not shown>',
            req_id,
        });
    }

    const { balance, currency, email, is_virtual, landing_company_name, loginid, trading } = matching_account;

    const response = {
        authorize: {
            account_list: session.accounts,
            balance,
            country: 'id',
            currency,
            email,
            fullname: '  ',
            is_virtual,
            landing_company_fullname: 'Deriv Limited',
            landing_company_name,
            local_currencies: {
                USD: {
                    fractional_digits: 2,
                },
            },
            loginid,
            preferred_language: 'EN',
            scopes: ['read', 'trade', 'trading_information', 'payments', 'admin'],
            trading,
            upgradeable_landing_companies: ['svg'],
            user_id: session.session_id,
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
