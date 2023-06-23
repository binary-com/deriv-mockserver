import { WebSocketServer } from 'ws';
import { handleGenericError } from './utils/error.utils';
import { onMessageHandler } from './interceptor';
import 'dotenv/config';
import { global_deriv_api } from './config/deriv-api.config';

const wss = new WebSocketServer({ port: 42069 });

wss.on('connection', ws => {
    ws.on('message', data => {
        return onMessageHandler(data, ws);
    });

    ws.on('error', error => {
        return handleGenericError('server_error', error.message, ws);
    });
});
