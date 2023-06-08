import { AccountDTO } from '../dto/account.dto';
import { Account } from './authorise';
import { GenericRequest, GenericResponse } from './base';
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
        account_list?: AccountDTO[];
    };
}
