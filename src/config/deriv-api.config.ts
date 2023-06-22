import WebSocket from 'ws';
// @ts-ignore
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic';
import { AuthorizeRequest, AuthorizeResponse } from '@deriv/api-types';
import { Observable } from 'rxjs';

export type DerivApi = {
    send: <T extends object>(...requestData: unknown[]) => Promise<T>;
    subscribe: <T extends object>(...requestData: unknown[]) => Observable<T>;
    authorize: (requestData: AuthorizeRequest) => Promise<AuthorizeResponse>;
    reconnect: () => void;
    keepAlivePing: () => void;
};

/**
 * Creates a new DerivWS Instance
 * @returns {DerivApi}
 */
export const createDerivWSInstance = (): DerivApi => {
    const deriv_ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=1089');

    return new DerivAPIBasic({ connection: deriv_ws });
};

export const global_deriv_api = createDerivWSInstance();
