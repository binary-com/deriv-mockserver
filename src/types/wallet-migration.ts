import { Account } from '../schema/account.schema';
import { WalletMigrationConfig } from '../schema/wallet.schema';
import { GenericRequest, GenericResponse } from './base';

export interface WalletMigrationConfigRequest extends GenericRequest {
    wallet_migration_config: WalletMigrationConfig;
}

export interface WalletRequest extends GenericRequest {
    wallet_migration: 'status';
}

export enum WalletMigrationStatus {
    InEligible = 'ineligible',
    Eligible = 'eligible',
    InProgress = 'in_progress',
    Done = 'done',
    Failed = 'failed',
}

export interface WalletMigrationResponse extends GenericResponse<WalletRequest> {
    wallet_migration: {
        status: WalletMigrationStatus;
        account_list?: Account[];
    };
}
