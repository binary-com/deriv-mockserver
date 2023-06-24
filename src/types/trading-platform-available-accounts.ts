import { GenericRequest } from './base.type';

export interface TradingPlatformAvailableAccountsRequest extends GenericRequest {
    trading_platform_available_accounts: 0 | 1;
    platform: string;
}
