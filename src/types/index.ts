import { AuthorizeResponse } from './authorize';
import { GenericRequest, GenericResponse } from './base.type';
import { WalletMigrationResponse } from './wallet-migration';

export type Response<T> = T extends 'authorize'
    ? AuthorizeResponse
    : T extends 'wallet_migration'
    ? WalletMigrationResponse
    : GenericResponse<GenericRequest>;
