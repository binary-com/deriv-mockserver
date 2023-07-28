import { InterceptedAPIHandler } from '../types/base.type';
import { TopUpVirtualRequest } from '../types/topup-virtual.type';

export const topupVirtual = ({ data, ws, session }: InterceptedAPIHandler) => {
    const { topup_virtual, req_id } = data as TopUpVirtualRequest;
    const virtual_account = session.accounts.find(
        account => account.is_virtual === 1 && account.landing_company_name === 'virtual'
    );

    const virtual_balance = virtual_account?.balance;

    const amount = 10000 - virtual_balance!;

    if (!virtual_account) {
        return ws.send(
            JSON.stringify({
                error: {
                    code: 'VirtualAccountNotFound',
                    message: 'No virtual account found.',
                },
                msg_type: 'topup_virtual',
                req_id,
            })
        );
    }

    const response = {
        echo_req: { req_id, topup_virtual },
        msg_type: 'topup_virtual',
        req_id,

        topup_virtual: {
            amount,
            currency: 'USD',
        },
    };
    virtual_account.balance = 10000;
    return ws.send(JSON.stringify(response));
};
