import { InterceptedAPIHandler } from '../../types/base.type';
import { WalletRequest } from '../../types/wallet-migration';
import { handleGenericError } from '../../utils/error.utils';
import { handleResetWalletMigration } from './reset.wallet-migration';
import { handleStartWalletMigration } from './start.wallet-migration.api';
import { handleWalletMigrationStatus } from './status.wallet-migration.api';

export const walletMigration = ({ data, ws, session }: InterceptedAPIHandler) => {
    const { wallet_migration } = data as WalletRequest;

    switch (wallet_migration) {
        case 'state':
            return handleWalletMigrationStatus({ data, ws, session });
        case 'start':
            return handleStartWalletMigration({ data, ws, session });
        case 'reset':
            return handleResetWalletMigration({ data, ws, session });
        default:
            return handleGenericError('input_validation', '', ws, data);
    }
};
