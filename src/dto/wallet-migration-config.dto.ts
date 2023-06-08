import { IsEnum, IsOptional } from 'class-validator';
import { WalletMigrationStatus } from '../types/wallet-migration';

export class WalletMigrationConfigDTO {
    @IsOptional()
    @IsEnum(WalletMigrationStatus)
    status: WalletMigrationStatus;
}
