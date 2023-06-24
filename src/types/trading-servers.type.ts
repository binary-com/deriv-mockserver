import { GenericRequest } from './base.type';

export interface TradingServersRequest extends GenericRequest {
    trading_servers: 1;
    platform: 'dxtrade' | 'mt5';
}
