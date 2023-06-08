import { WebSocket } from 'ws';
import { getMatchingKeys } from '../utils/object.utils';
import { Client } from '../store/client.store';
import { intercepted_endpoints } from '../config/intercepted-endpoints.config';
import { authorize } from '../api/authorize.api';
import { walletMigration } from '../api/wallet-migration.api';

export const mockInterceptor = async (parsed_data: object, ws: WebSocket, client: Client) => {
    const endpoint_type = getMatchingKeys(parsed_data, intercepted_endpoints) as (typeof intercepted_endpoints)[number];

    switch (endpoint_type) {
        case 'authorize':
            return await authorize({ data: parsed_data, ws, client });
        case 'new_account_real':
        case 'new_account_virtual':
        case 'new_account_wallet':
        case 'get_available_accounts_to_transfer':
        case 'transfer_between_accounts':
        case 'wallet_migration':
            return await walletMigration({ data: parsed_data, ws, client });
        default:
            break;
    }
};
