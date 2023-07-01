import { Account } from '../../schema/account.schema';
import { InterceptedAPIHandler } from '../../types/base.type';
import { WalletMigrationResponse, WalletMigrationStatus, WalletRequest } from '../../types/wallet-migration';
import { handleWalletMigrationStatus } from './status.wallet-migration.api';

export const walletMigration = ({ data, ws, session }: InterceptedAPIHandler) => {
    const { wallet_migration } = data as WalletRequest;

    switch (wallet_migration) {
        case 'status':
            return handleWalletMigrationStatus({ data, ws, session });

        case 'start':
    }
};

const generateWalletMigrationStatusResponse = ({
    data,
    wallet_accounts,
    status,
}: Pick<InterceptedAPIHandler, 'data'> & {
    wallet_accounts: Account[] | undefined;
    status: WalletMigrationStatus;
}) => {
    const wallet_migration =
        Array.isArray(wallet_accounts) && wallet_accounts.length > 0
            ? { status: status, account_list: wallet_accounts }
            : {
                  status,
              };

    const { req_id } = data as WalletRequest;
    const reponse: WalletMigrationResponse = {
        echo_req: {
            ...(data as WalletRequest),
        },
        wallet_migration,
        msg_type: 'wallet_migration',
        req_id,
    };

    return reponse;
};
