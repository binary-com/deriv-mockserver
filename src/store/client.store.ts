import { DerivApi, createDerivWSInstance } from '../config/deriv-api.config';
import { WalletMigrationStatus } from '../types/wallet-migration';

export type Client = {
    mock_id: string;
    token?: string;
    deriv_api: DerivApi;
    wallet_migration_config?: {
        status?: WalletMigrationStatus;
        has_real_usd_account?: boolean;
        has_p2p_account?: boolean;
        has_used_pa_last_3months?: boolean;
        is_payment_agent?: boolean;
    };
};

export const client_list: Client[] = [];

export const getMatchingSession = (parsed_data: any): Client => {
    const { mock_id = '' } = parsed_data;
    const matching_client = client_list.find(c => c.mock_id === mock_id);
    if (!matching_client) {
        return createClientSession(mock_id);
    }
    return matching_client;
};

export const createClientSession = (mock_id: string): Client => {
    const new_client = {
        mock_id,
        deriv_api: createDerivWSInstance(),
    };
    client_list.push(new_client);
    return new_client;
};
