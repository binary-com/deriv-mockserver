import { InterceptedAPIHandler } from '../../types/base.type';
import { TradingPlatformAccountsRequest } from '../../types/trading-platform-accounts.type';
import tradingPlatformAccountsResponse from '../../response/trading-platform-accounts-response';

export const tradingPlatformAccounts = async ({ data, ws }: InterceptedAPIHandler) => {
    const { trading_platform_accounts, platform, req_id } = data as TradingPlatformAccountsRequest;

    if (platform === 'dxtrade') {
        return ws.send(
            JSON.stringify({
                echo_req: {
                    trading_platform_accounts,
                    platform,
                    req_id,
                },
                msg_type: 'trading_platform_accounts',
                req_id,
                trading_platform_accounts: tradingPlatformAccountsResponse,
            })
        );
    }
};
