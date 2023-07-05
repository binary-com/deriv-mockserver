import { v4 as uuidv4 } from 'uuid';
import { InterceptedAPIHandler } from '../types/base.type';
import { BalanceRequest, BalanceResponse } from '../types/balance.type';

const getBalanceKey = (platform: string, is_virtual: boolean) => {
    if (platform === 'deriv') {
        return is_virtual ? 'deriv_demo' : 'deriv';
    } else {
        return is_virtual ? 'mt5_demo' : 'mt5';
    }
};

export const balance = async ({ data, ws, session }: InterceptedAPIHandler) => {
    const { account = 'current', subscribe, req_id } = data as BalanceRequest;

    if (account === 'all') {
        const unique_id = uuidv4();
        let account_balance_obj: Record<string, any> = {};
        let total_balance = {
            deriv: 0,
            deriv_demo: 0,
            mt5: 0,
            mt5_demo: 0,
        };

        session.accounts.forEach(a => {
            const { loginid, balance = 0, currency, is_virtual, is_disabled, platform = 'deriv' } = a;
            if (loginid) {
                account_balance_obj[loginid] = {
                    balance: balance,
                    converted_amount: balance,
                    currency: currency || 'USD',
                    demo_account: is_virtual || 0,
                    status: is_disabled || 1,
                    type: 'deriv',
                };
            }

            const platform_key = getBalanceKey(platform, !!is_virtual);
            total_balance[platform_key] += balance;
        });

        const { balance = 0, currency = 'usd', loginid = '' } = session.active_account;

        const response: BalanceResponse<'all'> = {
            balance: {
                accounts: account_balance_obj,
                balance,
                currency,
                id: unique_id,
                loginid,
                total: {
                    deriv: { amount: total_balance.deriv, currency: 'USD' },
                    deriv_demo: { amount: total_balance.deriv_demo, currency: 'USD' },
                    mt5: { amount: total_balance.mt5, currency: 'USD' },
                    mt5_demo: { amount: total_balance.mt5_demo, currency: 'USD' },
                },
            },
            echo_req: { account, balance: 1, req_id, subscribe },
            msg_type: 'balance',
            req_id,
            subscription: { id: unique_id },
        };

        return ws.send(JSON.stringify(response));
    }

    const matching_account =
        account === 'current' ? session.active_account : session.accounts.find(a => a.loginid === account);

    if (matching_account) {
        const unique_id = uuidv4();
        const { balance = 0, currency = 'USD', loginid = '' } = matching_account;
        const response: BalanceResponse<'specific'> = {
            balance: {
                balance,
                currency,
                id: unique_id,
                loginid,
            },
            echo_req: { account, balance, req_id, subscribe },
            msg_type: 'balance',
            req_id,
            subscription: { id: unique_id },
        };

        return ws.send(JSON.stringify(response));
    }
};
