import { InterceptedAPIHandler } from '../types/base.type';
import { TradingPlatformAvailableAccountsRequest } from '../types/trading-platform-available-accounts';

export const tradingPlatformAvailableAccounts = ({ data, ws }: InterceptedAPIHandler) => {
    const { trading_platform_available_accounts, platform, req_id } = data as TradingPlatformAvailableAccountsRequest;

    const response = {
        echo_req: {
            platform,
            req_id,
            trading_platform_available_accounts,
        },
        msg_type: 'trading_platform_available_accounts',
        req_id,
        trading_platform_available_accounts: [
            {
                linkable_landing_companies: ['svg'],
                market_type: 'all',
                name: 'Deriv (SVG) LLC',
                requirements: {
                    signup: ['first_name', 'last_name', 'residence', 'date_of_birth'],
                    withdrawal: ['address_city', 'address_line_1'],
                },
                shortcode: 'svg',
                sub_account_type: 'swap_free',
            },
            {
                linkable_landing_companies: ['svg'],
                market_type: 'financial',
                name: 'Deriv (SVG) LLC',
                requirements: {
                    signup: ['first_name', 'last_name', 'residence', 'date_of_birth'],
                    withdrawal: ['address_city', 'address_line_1'],
                },
                shortcode: 'svg',
                sub_account_type: 'standard',
            },
            {
                linkable_landing_companies: ['svg'],
                market_type: 'financial',
                name: 'Deriv (BVI) Ltd',
                requirements: {
                    after_first_deposit: {
                        financial_assessment: ['financial_information', 'trading_experience'],
                    },
                    compliance: {
                        mt5: ['fully_authenticated', 'expiration_check'],
                        tax_information: ['tax_residence', 'tax_identification_number'],
                    },
                    signup: ['phone', 'citizen', 'account_opening_reason'],
                },
                shortcode: 'bvi',
                sub_account_type: 'standard',
            },
            {
                linkable_landing_companies: ['svg'],
                market_type: 'financial',
                name: 'Deriv (V) Ltd',
                requirements: {
                    after_first_deposit: {
                        financial_assessment: ['financial_information'],
                    },
                    compliance: {
                        mt5: ['fully_authenticated', 'expiration_check'],
                        tax_information: ['tax_residence', 'tax_identification_number'],
                    },
                    signup: [
                        'citizen',
                        'place_of_birth',
                        'tax_residence',
                        'tax_identification_number',
                        'account_opening_reason',
                    ],
                },
                shortcode: 'vanuatu',
                sub_account_type: 'standard',
            },
            {
                linkable_landing_companies: ['svg'],
                market_type: 'financial',
                name: 'Deriv (FX) Ltd',
                requirements: {
                    after_first_deposit: {
                        financial_assessment: ['financial_information', 'trading_experience'],
                    },
                    compliance: {
                        mt5: ['fully_authenticated', 'expiration_check'],
                        tax_information: ['tax_residence', 'tax_identification_number'],
                    },
                    signup: ['phone', 'citizen', 'account_opening_reason'],
                },
                shortcode: 'labuan',
                sub_account_type: 'stp',
            },
            {
                linkable_landing_companies: ['svg'],
                market_type: 'gaming',
                name: 'Deriv (SVG) LLC',
                requirements: {
                    signup: ['first_name', 'last_name', 'residence', 'date_of_birth'],
                    withdrawal: ['address_city', 'address_line_1'],
                },
                shortcode: 'svg',
                sub_account_type: 'standard',
            },
            {
                linkable_landing_companies: ['svg'],
                market_type: 'gaming',
                name: 'Deriv (BVI) Ltd',
                requirements: {
                    after_first_deposit: {
                        financial_assessment: ['financial_information', 'trading_experience'],
                    },
                    compliance: {
                        mt5: ['fully_authenticated', 'expiration_check'],
                        tax_information: ['tax_residence', 'tax_identification_number'],
                    },
                    signup: ['phone', 'citizen', 'account_opening_reason'],
                },
                shortcode: 'bvi',
                sub_account_type: 'standard',
            },
            {
                linkable_landing_companies: ['svg'],
                market_type: 'gaming',
                name: 'Deriv (V) Ltd',
                requirements: {
                    after_first_deposit: {
                        financial_assessment: ['financial_information'],
                    },
                    compliance: {
                        mt5: ['fully_authenticated', 'expiration_check'],
                        tax_information: ['tax_residence', 'tax_identification_number'],
                    },
                    signup: [
                        'citizen',
                        'place_of_birth',
                        'tax_residence',
                        'tax_identification_number',
                        'account_opening_reason',
                    ],
                },
                shortcode: 'vanuatu',
                sub_account_type: 'standard',
            },
        ],
    };

    return ws.send(JSON.stringify(response));
};
