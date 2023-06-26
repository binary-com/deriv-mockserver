import { WebSocket } from 'ws';
import { Session } from '../store/session.store';

export interface InterceptedAPIHandler {
    data: object;
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

export interface GenericSubscribeResponse<T> extends GenericResponse<T> {
    subscription: { id: string };
}

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
