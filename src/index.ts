import { WebSocketServer } from 'ws';
import { handleGenericError } from './utils/error.utils';
import { onMessageHandler } from './interceptor';
import SessionManager from './store/session.store';
import 'dotenv/config';

const wss = new WebSocketServer({ port: 42069 });

wss.on('connection', ws => {
    ws.on('message', data => {
        return onMessageHandler(data, ws);
    });

    ws.on('error', error => {
        return handleGenericError('server_error', error.message, ws);
    });

    ws.on('close', () => {
        SessionManager.reInitialize();
    });
});
