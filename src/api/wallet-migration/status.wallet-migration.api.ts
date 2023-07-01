import { InterceptedAPIHandler } from '../../types/base.type';
import { WalletMigrationResponse, WalletMigrationStatus, WalletRequest } from '../../types/wallet-migration';

export const handleWalletMigrationStatus = ({ data, ws, session }: InterceptedAPIHandler) => {
    const { session_id, ...request } = data as WalletRequest;
    let account_list;
    let wallet_migration_status = WalletMigrationStatus.InEligible;

    if (session.wallet_migration_config) {
        const { status } = session.wallet_migration_config;
        if (status) {
            wallet_migration_status = status;
        }
    }

    if (wallet_migration_status === WalletMigrationStatus.Eligible) {
    }

    const response: WalletMigrationResponse = {
        echo_req: { ...request },
        wallet_migration: {
            status: wallet_migration_status,
        },
        msg_type: 'wallet_migration',
        req_id: request.req_id,
    };

    return ws.send(JSON.stringify(response));
};
