interface AccountData {
    account_id: string;
    account_type: string;
    balance: string;
    currency: string;
    display_balance: string;
    enabled: number;
    login: string;
    landing_company_short: string;
    market_type: string;
    platform: string;
}

// Add your data for dxtrade or derivez here
const tradingPlatformAccountsResponse: AccountData[] = [
    {
        account_id: 'DXD112313',
        account_type: 'real',
        balance: '10000',
        currency: 'USD',
        display_balance: '1000.00',
        enabled: 1,
        login: '123123123',
        landing_company_short: 'svg',
        market_type: 'all',
        platform: 'dxtrade',
    },
    {
        account_id: 'DXD8909813',
        account_type: 'demo',
        balance: '69420',
        currency: 'USD',
        display_balance: '69420.00',
        enabled: 1,
        login: '69420',
        landing_company_short: 'svg',
        market_type: 'all',
        platform: 'dxtrade',
    },
];

export default tradingPlatformAccountsResponse;
