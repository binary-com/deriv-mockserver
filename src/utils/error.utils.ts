import { WebSocket } from 'ws';
import { ErrorResponse } from '../types/base';

export type Error = {
    id: string;
    details: string;
};

/**
 * Generates a deriv ws compliant error object.
 * @param error
 * @param req
 * @returns
 */
export const generateErrorResponse = (error: Error, req: any = {}): ErrorResponse<typeof req> => {
    const { id, details } = error;
    const code = id.replace(/(_\w)/g, match => match[1].toUpperCase()).replace(/(^.)/, match => match.toUpperCase());

    return {
        echo_req: req,
        error: {
            code,
            details: {
                [id]: details,
            },
        },
        msg_type: id,
    };
};

/**
 * Handle generic errors
 */
export const handleGenericError = (id: string, message: string, ws: WebSocket, req = {}) => {
    return ws.send(
        JSON.stringify(
            generateErrorResponse(
                {
                    id,
                    details: message,
                },
                req
            )
        )
    );
};
