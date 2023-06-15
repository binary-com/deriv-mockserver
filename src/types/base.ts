import { WebSocket } from 'ws';
import { Client } from '../store/client.store';

export interface InterceptedAPIHandler {
    data: ParsedRequestData;
    ws: WebSocket;
    client: Client;
}
export interface GenericRequest {
    mock_id: string;
    req_id: number;
}

export type ParsedRequestData = GenericRequest & Record<string, any>;

export interface GenericResponse<T> {
    echo_req: T & {
        req_id: number;
    };
    msg_type: string;
    req_id: number;
}

export interface ErrorResponse<T> extends GenericResponse<T> {
    error: {
        code: string;
        details: Record<string, string>;
    };
}
