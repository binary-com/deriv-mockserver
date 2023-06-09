import { z } from 'zod';
import { WalletMigrationStatus } from '../types/wallet-migration';

export type WalletMigrationConfig = z.infer<typeof wallet_migration_config_schema>;

export const wallet_migration_config_schema = z
    .object({
        status: z.nativeEnum(WalletMigrationStatus),
        has_real_usd_account: z.boolean(),
        has_p2p_account: z.boolean(),
        has_used_pa_last_3months: z.boolean(),
        is_payment_agent: z.boolean(),
    })
    .partial();
