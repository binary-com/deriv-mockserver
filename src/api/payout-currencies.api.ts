import { GenericRequest, InterceptedAPIHandler } from '../types/base.type';

export const payoutCurrencies = ({ data, ws, session }: InterceptedAPIHandler) => {
    const { req_id } = data as GenericRequest;
    const { currency: active_currency = 'usd' } = session.active_account;

    const response = {
        echo_req: { payout_currencies: 1, req_id },
        msg_type: 'payout_currencies',
        payout_currencies: [active_currency],
        req_id,
    };

    ws.send(JSON.stringify(response));
};
