import { generator_endpoints } from '../config/generator-endpoints.config';
import { handleGenericError } from '../utils/error.utils';
import { getFirstMatchingKey } from '../utils/object.utils';
import { walletMigrationConfig } from '../generator/wallet-migration-config.generator';
import { InterceptedAPIHandler } from '../types/base';
import { accountGenerator } from '../generator/account.generator';
import { sessionList } from '../generator/session-list.generator';

export const generatorInterceptor = async (intercepted_args: InterceptedAPIHandler) => {
    const { ws, data } = intercepted_args;
    const endpoint_type = getFirstMatchingKey(data, generator_endpoints) as (typeof generator_endpoints)[number];

    switch (endpoint_type) {
        case 'account':
            return accountGenerator(intercepted_args);
        case 'get_session_list':
            return sessionList(intercepted_args);
            return;
        case 'wallet_migration_config':
            return walletMigrationConfig(intercepted_args);
        default:
            return handleGenericError('invalid_input', 'Missing endpoint type.', ws, data);
    }
};
