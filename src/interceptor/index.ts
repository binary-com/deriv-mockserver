import { RawData, WebSocket } from 'ws';
import { full_proxy_endpoints } from '../config/full-proxy-endpoints.config';
import { generatorInterceptor } from './generator.interceptor';
import { getFirstMatchingKey } from '../utils/object.utils';
import { global_deriv_api } from '../config/deriv-api.config';
import { handleGenericError } from '../utils/error.utils';
import { mockInterceptor } from './mock.interceptor';
import { ParsedRequestData } from '../types/base.type';
import { proxyInterceptor } from './proxy.interceptor';
import SessionStore from '../store/session.store';

export const onMessageHandler = (data: RawData, ws: WebSocket) => {
    try {
        const parsed_data = JSON.parse(data.toString()) as ParsedRequestData;
        if (!('session_id' in parsed_data)) {
            return handleGenericError('session_id', 'Session id must be present in each call', ws, parsed_data);
        }

        const matching_endpoint = getFirstMatchingKey(
            parsed_data,
            full_proxy_endpoints
        ) as (typeof full_proxy_endpoints)[number];
        if (matching_endpoint) {
            return proxyInterceptor({ data: parsed_data, ws, deriv_api: global_deriv_api });
        }

        const session = SessionStore.getMatchingSession(parsed_data.session_id);

        if ('generate_mock' in parsed_data) {
            return generatorInterceptor({ data: parsed_data, ws, session });
        }

        return mockInterceptor({ data: parsed_data, ws, session });
    } catch (e) {
        return handleGenericError('invalid_input', (e as Error)?.message || '', ws);
    }
};
