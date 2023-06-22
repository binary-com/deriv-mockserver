import { WebSocket } from 'ws';
import { Session } from '../store/session.store';

export interface InterceptedAPIHandler {
    data: ParsedRequestData;
    ws: WebSocket;
    session: Session;
}

export interface GenericSubscribeRequest extends GenericRequest {
    subscribe: number;
}

export interface GenericRequest {
    session_id: string;
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
