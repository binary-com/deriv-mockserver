import { InterceptedAPIHandler } from '../types/base.type';

export const balance = async ({ data, ws, session }: InterceptedAPIHandler) => {
    const response_all = {
        balance: { balance: 0, currency: 'USD', id: '68bb85d5-2070-1e79-b3b1-4a374149acfc', loginid: 'CR4529478' },
        echo_req: { account: 'CR4529478', balance: 1, req_id: 5, subscribe: 1 },
        msg_type: 'balance',
        req_id: 5,
        subscription: { id: '68bb85d5-2070-1e79-b3b1-4a374149acfc' },
    };
};
