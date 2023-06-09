import { RawData, WebSocket } from 'ws';
import { generatorInterceptor } from './generator.interceptor';
import { handleGenericError } from '../utils/error.utils';
import { mockInterceptor } from './mock.interceptor';
import SessionStore from '../store/session.store';

export const onMessageHandler = (data: RawData, ws: WebSocket) => {
    try {
        const parsed_data = JSON.parse(data.toString());
        if (!('session_id' in parsed_data)) {
            return handleGenericError('session_id', 'session_id must be present in each call', ws, parsed_data);
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
