import { InterceptedAPIHandler } from '../../types/base.type';
import { WalletMigrationResponse, WalletMigrationStatus, WalletRequest } from '../../types/wallet-migration';
import { handleGenericError } from '../../utils/error.utils';

export const handleStartWalletMigration = ({ data, ws, session }: InterceptedAPIHandler) => {
    const { session_id, ...request } = data as WalletRequest;

    if (session.wallet_migration_config.status === WalletMigrationStatus.Eligible) {
        const response: WalletMigrationResponse = {
            echo_req: { ...request },
            wallet_migration: {
                status: WalletMigrationStatus.InProgress,
            },
            msg_type: 'wallet_migration',
            req_id: request.req_id,
        };

        return ws.send(JSON.stringify(response));
    }

    return handleGenericError('not_eligible', 'You are not eligible for a wallet account.', ws, request);
};
