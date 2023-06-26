import { InterceptedAPIHandler } from '../types/base.type';
import { TradingServersRequest } from '../types/trading-servers.type';

export const tradingServers = ({ data, ws }: InterceptedAPIHandler) => {
    const { trading_servers, platform, req_id } = data as TradingServersRequest;

    if (platform === 'dxtrade') {
        const response = {
            echo_req: {
                platform,
                req_id,
                trading_servers,
            },
            msg_type: 'trading_servers',
            req_id,
            trading_servers: [
                {
                    account_type: 'real',
                    disabled: 0,
                    supported_accounts: ['all'],
                },
                {
                    account_type: 'demo',
                    disabled: 0,
                    supported_accounts: ['all'],
                },
            ],
        };

        return ws.send(JSON.stringify(response));
    }

    const response = {
        echo_req: {
            platform,
            req_id,
            trading_servers,
        },
        msg_type: 'trading_servers',
        req_id,
        trading_servers: [
            {
                account_type: 'real',
                disabled: 0,
                environment: 'Deriv-Server',
                geolocation: {
                    group: 'asia_synthetic',
                    location: 'Singapore',
                    region: 'Asia',
                    sequence: 1,
                },
                id: 'p01_ts03',
                market_type: 'synthetic',
                recommended: 1,
                supported_accounts: ['gaming'],
            },
        ],
    };

    return ws.send(JSON.stringify(response));
};
