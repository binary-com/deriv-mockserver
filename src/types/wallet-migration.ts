import { Account } from '../schema/account.schema';
import { WalletMigrationConfig } from '../schema/wallet.schema';
import { GenericRequest, GenericResponse } from './base.type';

export interface WalletMigrationConfigRequest extends GenericRequest {
    wallet_migration_config: WalletMigrationConfig;
}

export interface WalletRequest extends GenericRequest {
    wallet_migration: 'state' | 'start' | 'reset';
}

export enum WalletMigrationStatus {
    InEligible = 'ineligible',
    Eligible = 'eligible',
    InProgress = 'in_progress',
    Migrated = 'migrated',
    Failed = 'failed',
}

export interface WalletMigrationResponse extends GenericResponse<Omit<WalletRequest, 'session_id'>> {
    wallet_migration: {
        status: WalletMigrationStatus;
        account_list?: Account[];
    };
}
