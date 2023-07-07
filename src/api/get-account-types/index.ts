import { InterceptedAPIHandler } from '../../types/base.type';
import { GetAccountTypesRequest } from './get-account-types.type';

export const getAccountTypes = async ({ data, ws, session }: InterceptedAPIHandler) => {
    const default_landing_company = session.active_account.landing_company_shortcode;
    const { get_account_types, company = default_landing_company } = data as GetAccountTypesRequest;

    const response = {
        echo_req: {
            company: 'svg',
            get_account_types: 1,
            req_id: 53,
        },
        get_account_types: {
            trading: {
                binary: {
                    allowed_wallet_currencies: [
                        'AUD',
                        'BTC',
                        'ETH',
                        'EUR',
                        'GBP',
                        'LTC',
                        'USD',
                        'USDC',
                        'UST',
                        'eUSDT',
                    ],
                    linkable_to_different_currency: 0,
                    linkable_wallet_types: ['doughflow', 'crypto', 'p2p', 'paymentagent_client'],
                },
                derivez: {
                    allowed_wallet_currencies: ['AUD', 'EUR', 'GBP', 'USD'],
                    linkable_to_different_currency: 1,
                    linkable_wallet_types: ['doughflow', 'p2p', 'paymentagent_client'],
                },
                dxtrade: {
                    allowed_wallet_currencies: ['AUD', 'EUR', 'GBP', 'USD'],
                    linkable_to_different_currency: 1,
                    linkable_wallet_types: ['doughflow', 'p2p', 'paymentagent_client'],
                },
                mt5: {
                    allowed_wallet_currencies: ['AUD', 'EUR', 'GBP', 'USD'],
                    linkable_to_different_currency: 1,
                    linkable_wallet_types: ['doughflow', 'p2p', 'paymentagent_client'],
                },
                standard: {
                    allowed_wallet_currencies: [
                        'AUD',
                        'BTC',
                        'ETH',
                        'EUR',
                        'GBP',
                        'LTC',
                        'USD',
                        'USDC',
                        'UST',
                        'eUSDT',
                    ],
                    linkable_to_different_currency: 0,
                    linkable_wallet_types: ['doughflow', 'crypto', 'p2p', 'paymentagent_client'],
                },
            },
            wallet: {
                crypto: {
                    currencies: ['BTC', 'ETH', 'LTC', 'USDC', 'UST', 'eUSDT'],
                },
                doughflow: {
                    currencies: ['AUD', 'EUR', 'GBP', 'USD'],
                },
                p2p: {
                    currencies: ['USD'],
                },
                paymentagent: {
                    currencies: ['AUD', 'BTC', 'ETH', 'EUR', 'GBP', 'LTC', 'USD', 'USDC', 'UST', 'eUSDT'],
                },
                paymentagent_client: {
                    currencies: ['AUD', 'BTC', 'ETH', 'EUR', 'GBP', 'LTC', 'USD', 'USDC', 'UST', 'eUSDT'],
                },
            },
        },
        msg_type: 'get_account_types',
        req_id: 53,
    };
};
