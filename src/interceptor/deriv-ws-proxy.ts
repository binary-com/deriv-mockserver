import { GenericRequest, InterceptedAPIHandler } from '../types/base';
import { getMatchingKeys } from '../utils/object.utils';

export const derivWSProxy = async ({ data, ws, client }: InterceptedAPIHandler) => {
    const { deriv_api } = client;
    const { mock_id, ...forwarded_data } = data as GenericRequest;
    const is_subscribe = getMatchingKeys(data, ['subscribe']) === 'subscribe';

    if (is_subscribe) {
        try {
            const subscription = await deriv_api.subscribe({ ...forwarded_data });
            subscription.subscribe(data => ws.send(JSON.stringify(data)));
        } catch (e) {
            ws.send(JSON.stringify(e));
        }
    } else {
        try {
            const response = await deriv_api.send({ ...forwarded_data });
            ws.send(JSON.stringify(response));
        } catch (e) {
            ws.send(JSON.stringify(e));
        }
    }
};
