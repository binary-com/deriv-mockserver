import { ZodError } from 'zod';
import { wallet_migration_config_schema } from '../schema/wallet.schema';
import { InterceptedAPIHandler } from '../types/base';
import { WalletMigrationConfigRequest } from '../types/wallet-migration';
import { handleGenericError } from '../utils/error.utils';

export const walletMigrationConfig = async ({ data, ws, client }: InterceptedAPIHandler) => {
    const { status, has_real_usd_account, has_p2p_account, has_used_pa_last_3months, is_payment_agent } = (
        data as WalletMigrationConfigRequest
    ).wallet_migration_config;

    const wallet_config = { status, has_real_usd_account, has_p2p_account, has_used_pa_last_3months, is_payment_agent };

    console.log(wallet_config);
    try {
        wallet_migration_config_schema.parse(wallet_config);
        client.wallet_migration_config = wallet_config;
    } catch (e) {
        if (e instanceof ZodError) {
            return handleGenericError('invalid_input', e.issues[0].message, ws, data);
        }
        handleGenericError('invalid_input', (e as Error)?.message || '', ws, data);
    }
};
