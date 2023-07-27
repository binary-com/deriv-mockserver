import { GenericRequest } from './base.type';

export interface TradingPlatformAccountsRequest extends GenericRequest {
    trading_platform_accounts: 1;
    platform: 'dxtrade' | 'derivez';
}
