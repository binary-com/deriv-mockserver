import { InterceptedAPIHandler } from '../types/base.type';
import { MT5LoginListRequest } from '../types/mt5-login-list.type';

export const mt5LoginList = ({ data, ws }: InterceptedAPIHandler) => {
    const { mt5_login_list, req_id } = data as MT5LoginListRequest;

    const response = {
        echo_req: { mt5_login_list, req_id },
        msg_type: 'mt5_login_list',
        mt5_login_list: [
            {
                account_type: 'real',
                balance: '10000',
                country: 'id',
                currency: 'USD',
                display_balance: '1000.00',
                email: '',
                leverage: '1000',
                landing_company_short: 'svg',
                login: 'MTD123123',
                market_type: 'all',
                name: 'Demo Swap-Free',
                sub_account_category: 'swap_free',
                sub_account_type: 'standard',
                server: 'p01_ts03',
            },
            {
                account_type: 'real',
                balance: '10000',
                country: 'id',
                currency: 'USD',
                display_balance: '1000.00',
                email: '',
                leverage: '1000',
                landing_company_short: 'labuan',
                login: 'MTD123123',
                market_type: 'synthetic',
                name: 'Demo Derived',
                sub_account_category: '',
                sub_account_type: 'financial',
                server: 'p01_ts03',
            },
        ],
        req_id,
    };

    return ws.send(JSON.stringify(response));
};
