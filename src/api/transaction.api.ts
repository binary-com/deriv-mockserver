import { InterceptedAPIHandler } from '../types/base';

export const transaction = ({ data, ws, session }: InterceptedAPIHandler) => {
    const { req_id } = data;

    const response = {
        echo_req: { req_id, subscribe: 1, transaction: 1 },
        msg_type: 'transaction',
        req_id,
        subscription: { id: '9629dbfd-4e50-7c99-86b2-8f93956d1983' },
        transaction: { id: '9629dbfd-4e50-7c99-86b2-8f93956d1983' },
    };

    return ws.send(JSON.stringify(response));
};
