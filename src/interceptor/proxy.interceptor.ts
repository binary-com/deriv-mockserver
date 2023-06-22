import { DerivApi } from '../config/deriv-api.config';
import { GenericSubscribeRequest, InterceptedAPIHandler } from '../types/base.type';

export const proxyInterceptor = async ({
    data,
    ws,
    deriv_api,
}: Omit<InterceptedAPIHandler, 'session'> & { deriv_api: DerivApi }) => {
    const { session_id, ...forwarded_data } = data as GenericSubscribeRequest;
    const { subscribe } = forwarded_data;

    if (subscribe === 1) {
        const subscription = await deriv_api.subscribe({ ...forwarded_data });
        subscription.subscribe({
            next: data => ws.send(JSON.stringify(data)),
            error: error => ws.send(JSON.stringify(error)),
        });
    } else {
        try {
            const response = await deriv_api.send({ ...forwarded_data });
            ws.send(JSON.stringify(response));
        } catch (e) {
            ws.send(JSON.stringify(e));
        }
    }
};
