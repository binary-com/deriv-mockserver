import { WebSocket } from 'ws';
import { Client } from '../store/client.store';
import { getMatchingKeys } from '../utils/object.utils';
import { generator_endpoints } from '../config/generator-endpoints.config';
import { handleGenericError } from '../utils/error.utils';
import { walletMigrationConfig } from '../generator/wallet-migration-config.generator';

export const generatorInterceptor = (parsed_data: object, ws: WebSocket, client: Client) => {
    const endpoint_type = getMatchingKeys(parsed_data, generator_endpoints) as (typeof generator_endpoints)[number];
    switch (endpoint_type) {
        case 'account':
            return;
        case 'wallet_migration_config':
            return walletMigrationConfig({ data: parsed_data, ws, client });
        default:
            return handleGenericError('invalid_input', 'Missing endpoint type.', ws, parsed_data);
    }
};
