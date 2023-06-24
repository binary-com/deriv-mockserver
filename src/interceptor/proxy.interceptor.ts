import { intercepted_endpoints } from '../config/intercepted-endpoints.config';
import { GenericSubscribeRequest, InterceptedAPIHandler } from '../types/base.type';

export const proxyInterceptor = async ({ data, ws, session }: InterceptedAPIHandler) => {
    const { session_id, ...forwarded_data } = data as GenericSubscribeRequest;
    const { subscribe } = forwarded_data;

    if ('forget_all' in forwarded_data && Array.isArray(forwarded_data.forget_all)) {
        const unsubscribe_list = [...forwarded_data.forget_all];
        forwarded_data.forget_all = unsubscribe_list.filter(u => !intercepted_endpoints.includes(u));
    }

    if (subscribe === 1) {
        const subscription = await session.deriv_api.subscribe({ ...forwarded_data });
        subscription.subscribe({
            next: data => ws.send(JSON.stringify(data)),
            error: error => ws.send(JSON.stringify(error)),
        });
    } else {
        try {
            const response = await session.deriv_api.send({ ...forwarded_data });
            ws.send(JSON.stringify(response));
        } catch (e) {
            ws.send(JSON.stringify(e));
        }
    }
};
