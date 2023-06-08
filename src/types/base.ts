import { WebSocket } from 'ws';
import { Client } from '../store/client.store';

export interface InterceptedAPIHandler {
    data: object;
    ws: WebSocket;
    client: Client;
}
export interface GenericRequest {
    mock_id: string;
}

export interface GenericResponse<T> {
    echo_req: T & {
        req_id: number;
    };
    msg_type: string;
}

export interface ErrorResponse<T> extends GenericResponse<T> {
    error: {
        code: string;
        details: Record<string, string>;
    };
}
