import { AuthorizeRequest } from '../types/authorize';
import { AccountStore } from '../store/account.store';
import { InterceptedAPIHandler } from '../types/base';
import { Account } from '../schema/account.schema';

export const authorize = async ({ data, ws }: InterceptedAPIHandler) => {
    const { authorize, session_id, req_id } = data as AuthorizeRequest;

    const accounts: Account[] = [
        {
            account_type: 'trading',
            created_at: 1664951196,
            currency: 'USD',
            is_disabled: 0,
            is_virtual: 0,
            landing_company_name: 'svg',
            loginid: 'CR4529478',
            trading: {},
        },
        {
            account_type: 'trading',
            created_at: 1670903526,
            currency: 'LTC',
            is_disabled: 0,
            is_virtual: 0,
            landing_company_name: 'svg',
            loginid: 'CR4826884',
            trading: {},
        },
        {
            account_type: 'trading',
            created_at: 1672110947,
            currency: 'ETH',
            is_disabled: 0,
            is_virtual: 0,
            landing_company_name: 'svg',
            loginid: 'CR4876712',
            trading: {},
        },
        {
            account_type: 'trading',
            created_at: 1672201567,
            currency: 'USDC',
            is_disabled: 0,
            is_virtual: 0,
            landing_company_name: 'svg',
            loginid: 'CR4880846',
            trading: {},
        },
        {
            account_type: 'trading',
            created_at: 1672201577,
            currency: 'eUSDT',
            is_disabled: 0,
            is_virtual: 0,
            landing_company_name: 'svg',
            loginid: 'CR4880847',
            trading: {},
        },
        {
            account_type: 'trading',
            created_at: 1672201590,
            currency: 'BTC',
            is_disabled: 0,
            is_virtual: 0,
            landing_company_name: 'svg',
            loginid: 'CR4880849',
            trading: {},
        },
        {
            account_type: 'trading',
            created_at: 1664784824,
            currency: 'USD',
            is_disabled: 0,
            is_virtual: 1,
            landing_company_name: 'virtual',
            loginid: 'VRTC6817101',
            trading: {},
        },
    ];

    const response = {
        authorize: {
            account_list: accounts,
            balance: 10046.18,
            country: 'id',
            currency: 'USD',
            email: 'yashim+chicken1@deriv.com',
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
            user_id: 10930015,
        },
        echo_req: {
            authorize: '<not shown>',
            req_id,
        },
        msg_type: 'authorize',
        req_id,
    };

    AccountStore.add({
        session_id: session_id,
        accounts: accounts,
    });
    ws.send(JSON.stringify(response));
};
