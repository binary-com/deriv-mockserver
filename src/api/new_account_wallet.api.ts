import { InterceptedAPIHandler } from '../types/base.type';
import { NewAccountWalletRequest } from '../types/new_account_wallet.type';

export const newAccountWallet = ({ data, ws, session }: InterceptedAPIHandler) => {
    const {
        new_account_wallet,
        req_id,
        account_type,
        currency,
        address_city,
        address_line_1,
        address_line_2,
        address_postcode,
        date_of_birth,
        first_name,
        last_name,
        phone,
        non_pep_declaration,
    } = data as NewAccountWalletRequest;

    const response = {
        echo_req: {
            new_account_wallet,
            req_id,
            account_type,
            currency,
            address_city,
            address_line_1,
            address_line_2,
            address_postcode,
            date_of_birth,
            first_name,
            last_name,
            phone,
            non_pep_declaration,
        },
        msg_type: 'new_account_wallet',
        new_account_wallet: {
            client_id: 'CRW123129',
            currency,
            landing_company: 'Deriv (SVG) LLC',
            landing_company_short: 'svg',
            landing_company_shortcode: 'svg',
            oauth_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        },
        req_id,
    };
    // add the new account wallet to the session
    session.accounts = [
        ...session.accounts,
        {
            account_category: 'wallet',
            account_type,
            created_at: 1664784824,
            currency,
            balance: Math.floor(Math.random() * 100),
            is_disabled: 0,
            is_virtual: 0,
            landing_company_name: 'svg',
            landing_company_shortcode: 'svg',
            loginid: `CRW${Math.floor(Math.random() * 100000)}`,
            trading: {},
            email: 'example@test.com',
            platform: 'deriv',
            excluded_until: 0,
        },
    ];
    return ws.send(JSON.stringify(response));
};
