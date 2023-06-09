import { generator_endpoints } from '../config/generator-endpoints.config';
import { handleGenericError } from '../utils/error.utils';
import { getFirstMatchingKey } from '../utils/object.utils';
import { walletMigrationConfig } from '../generator/wallet-migration-config.generator';
import { InterceptedAPIHandler } from '../types/base.type';
import { loginGenerator } from '../generator/login.generator';
import { sessionList } from '../generator/session-list.generator';

export const generatorInterceptor = async (intercepted_args: InterceptedAPIHandler) => {
    const { ws, data } = intercepted_args;
    const endpoint_type = getFirstMatchingKey(data, generator_endpoints) as (typeof generator_endpoints)[number];

    switch (endpoint_type) {
        case 'login':
            return loginGenerator(intercepted_args);
        case 'session_list':
            return sessionList(intercepted_args);
        case 'wallet_migration_config':
            return walletMigrationConfig(intercepted_args);
        default:
            return handleGenericError('invalid_input', 'Invalid generate_mock endpoint.', ws, data);
    }
};
