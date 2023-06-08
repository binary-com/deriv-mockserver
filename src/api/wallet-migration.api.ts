import { AccountDTO } from '../dto/account.dto';
import { MappedAccount } from '../store/account.store';
import { InterceptedAPIHandler } from '../types/base';
import { WalletMigrationResponse, WalletMigrationStatus, WalletRequest } from '../types/wallet-migration';

export const walletMigration = ({ data, ws, client }: InterceptedAPIHandler) => {
    const client_account_list = MappedAccount.get(client.mock_id);
    const wallet_accounts = client_account_list?.filter(w => w.account_category === 'wallet');
    let wallet_migration_status = WalletMigrationStatus.InEligible;

    if (client.wallet_migration_config) {
        const { status, has_real_usd_account, has_p2p_account, has_used_pa_last_3months, is_payment_agent } =
            client.wallet_migration_config;

        if (status) {
            wallet_migration_status = status;
        } else if (has_real_usd_account && !has_p2p_account && !has_used_pa_last_3months && !is_payment_agent) {
            wallet_migration_status = WalletMigrationStatus.Eligible;
        }
    }
    return ws.send(
        JSON.stringify(
            generateWalletMigrationResponse({
                data,
                wallet_accounts,
                status: wallet_migration_status,
            })
        )
    );
};

const generateWalletMigrationResponse = ({
    data,
    wallet_accounts,
    status,
}: Pick<InterceptedAPIHandler, 'data'> & {
    wallet_accounts: AccountDTO[] | undefined;
    status: WalletMigrationStatus;
}) => {
    const wallet_migration =
        Array.isArray(wallet_accounts) && wallet_accounts.length > 0
            ? { status: status, account_list: wallet_accounts }
            : {
                  status,
              };

    const reponse: WalletMigrationResponse = {
        echo_req: {
            req_id: 1,
            ...(data as WalletRequest),
        },
        wallet_migration,
        msg_type: 'wallet_migration',
    };

    return reponse;
};
