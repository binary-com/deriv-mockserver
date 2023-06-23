import { InterceptedAPIHandler } from '../types/base.type';

export const balance = async ({ data, ws, session }: InterceptedAPIHandler) => {
    const { subscribe } = data;

    if (subscribe === 1) {
        const response_specific = {
            balance: { balance: 0, currency: 'USD', id: '68bb85d5-2070-1e79-b3b1-4a374149acfc', loginid: 'CR4529478' },
            echo_req: { account: 'CR4529478', balance: 1, req_id: 5, subscribe: 1 },
            msg_type: 'balance',
            req_id: 5,
            subscription: { id: '68bb85d5-2070-1e79-b3b1-4a374149acfc' },
        };

        const response_all = {
            balance: {
                accounts: {
                    CR4529478: {
                        balance: 0,
                        converted_amount: 0,
                        currency: 'USD',
                        demo_account: 0,
                        status: 1,
                        type: 'deriv',
                    },
                    CR4826884: {
                        balance: 0,
                        converted_amount: 0,
                        currency: 'LTC',
                        demo_account: 0,
                        status: 1,
                        type: 'deriv',
                    },
                    CR4876712: {
                        balance: 0,
                        converted_amount: 0,
                        currency: 'ETH',
                        demo_account: 0,
                        status: 1,
                        type: 'deriv',
                    },
                    CR4880846: {
                        balance: 0,
                        converted_amount: 0,
                        currency: 'USDC',
                        demo_account: 0,
                        status: 1,
                        type: 'deriv',
                    },
                    CR4880847: {
                        balance: 0,
                        converted_amount: 0,
                        currency: 'eUSDT',
                        demo_account: 0,
                        status: 1,
                        type: 'deriv',
                    },
                    CR4880849: {
                        balance: 0,
                        converted_amount: 0,
                        currency: 'BTC',
                        demo_account: 0,
                        status: 1,
                        type: 'deriv',
                    },
                    VRTC6817101: {
                        balance: 10046.18,
                        converted_amount: 10046.18,
                        currency: 'USD',
                        demo_account: 1,
                        status: 1,
                        type: 'deriv',
                    },
                },
                balance: 0,
                currency: 'USD',
                id: 'ce940799-28e6-bb47-169a-f1cb95e9eacf',
                loginid: 'CR4529478',
                total: {
                    deriv: { amount: 0, currency: 'USD' },
                    deriv_demo: { amount: 10046.18, currency: 'USD' },
                    mt5: { amount: 0, currency: 'USD' },
                    mt5_demo: { amount: 0, currency: 'USD' },
                },
            },
            echo_req: { account: 'all', balance: 1, req_id: 4, subscribe: 1 },
            msg_type: 'balance',
            req_id: 4,
            subscription: { id: 'ce940799-28e6-bb47-169a-f1cb95e9eacf' },
        };

        return response_all;
    }
};
