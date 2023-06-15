import { InterceptedAPIHandler } from '../types/base';

export const getAccountStatus = ({ data, ws }: InterceptedAPIHandler) => {
    const { req_id } = data;

    const response = {
        echo_req: data,
        get_account_status: {
            authentication: {
                attempts: { count: 0, history: [], latest: null },
                document: { status: 'none' },
                identity: {
                    services: {
                        idv: { last_rejected: [], reported_properties: {}, status: 'none', submissions_left: 0 },
                        manual: { status: 'none' },
                        onfido: {
                            documents_supported: [],
                            is_country_supported: 0,
                            last_rejected: [],
                            reported_properties: {},
                            status: 'none',
                            submissions_left: 0,
                        },
                    },
                    status: 'none',
                },
                income: { status: 'none' },
                needs_verification: [],
                ownership: { requests: [], status: 'none' },
            },
            currency_config: { USD: { is_deposit_suspended: 0, is_withdrawal_suspended: 0 } },
            p2p_status: 'none',
            prompt_client_to_authenticate: 0,
            risk_classification: 'low',
            status: [
                'cashier_locked',
                'dxtrade_password_not_set',
                'financial_information_not_complete',
                'idv_disallowed',
                'mt5_password_not_set',
                'trading_experience_not_complete',
                'trading_hub',
            ],
        },
        msg_type: 'get_account_status',
        req_id,
    };

    return ws.send(JSON.stringify(response));
};
