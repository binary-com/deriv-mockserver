import { WebSocketServer } from 'ws';
import { generatorInterceptor, mockInterceptor } from './interceptor';
import { handleGenericError } from './utils/error.utils';
import { getMatchingSession } from './store/client.store';
import { ParsedRequestData } from './types/base';

const wss = new WebSocketServer({ port: 42069 });

wss.on('connection', ws => {
    ws.on('message', data => {
        try {
            const parsed_data = JSON.parse(data.toString()) as ParsedRequestData;
            console.log(parsed_data);
            if (!('mock_id' in parsed_data)) {
                return handleGenericError('mock_id', 'Mock id must be present in each call', ws, parsed_data);
            }

            const client = getMatchingSession(parsed_data);
            if ('generate_mock' in parsed_data) {
                return generatorInterceptor({ data: parsed_data, ws, client });
            }
            return mockInterceptor({ data: parsed_data, ws, client });
        } catch (e) {
            handleGenericError('invalid_input', (e as Error)?.message || '', ws);
        }
    });

    ws.on('error', error => {
        handleGenericError('server_error', error.message, ws);
    });
});

// Handling of different process signals.
// Ref: https://www.gnu.org/software/libc/manual/html_node/Termination-Signals.html
