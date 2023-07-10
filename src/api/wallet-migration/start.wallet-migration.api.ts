import { InterceptedAPIHandler } from '../../types/base.type';
import { WalletMigrationResponse, WalletMigrationStatus, WalletRequest } from '../../types/wallet-migration';
import { handleGenericError } from '../../utils/error.utils';

export const handleStartWalletMigration = ({ data, ws, session }: InterceptedAPIHandler) => {
    const { session_id, ...request } = data as WalletRequest;

    switch (session.wallet_migration_config.status) {
        case WalletMigrationStatus.Eligible:
            const response: WalletMigrationResponse = {
                echo_req: { ...request },
                wallet_migration: {
                    state: WalletMigrationStatus.InProgress,
                },
                msg_type: 'wallet_migration',
                req_id: request.req_id,
            };

            session.wallet_migration_config.status = WalletMigrationStatus.InProgress;

            setTimeout(() => {
                session.wallet_migration_config.status = WalletMigrationStatus.Migrated;
            }, 10000);

            return ws.send(JSON.stringify(response));

        case WalletMigrationStatus.InEligible:
            return handleGenericError('wallet_not_eligible', 'You are not eligible for a wallet account.', ws, request);

        case WalletMigrationStatus.InProgress:
            return handleGenericError(
                'wallet_in_progress',
                'Your wallet migration request is still in progress',
                ws,
                request
            );

        case WalletMigrationStatus.Failed:
            return handleGenericError('wallet_failed', 'Your wallet migration request has failed.', ws, request);

        case WalletMigrationStatus.Migrated:
            return handleGenericError('wallet_done', 'Your wallet migration has already complete.', ws, request);
    }
};
