import { Account } from '../../schema/account.schema';
import { InterceptedAPIHandler } from '../../types/base.type';
import { WalletMigrationResponse, WalletMigrationStatus, WalletRequest } from '../../types/wallet-migration';

export const handleWalletMigrationStatus = ({ data, ws, session }: InterceptedAPIHandler) => {
    const { session_id, ...request } = data as WalletRequest;

    let wallet_migration_status = WalletMigrationStatus.InEligible;

    if (session.wallet_migration_config) {
        const { status } = session.wallet_migration_config;
        if (status) {
            wallet_migration_status = status;
        }
    }

    const response: WalletMigrationResponse = {
        echo_req: { ...request },
        wallet_migration: {
            state: wallet_migration_status,
        },
        msg_type: 'wallet_migration',
        req_id: request.req_id,
    };

    if (wallet_migration_status === WalletMigrationStatus.Eligible) {
        const account_list = generateAccountListInfo(session.accounts);
        if (account_list.length) {
            response.wallet_migration.account_list = account_list;
        }
    }

    return ws.send(JSON.stringify(response));
};

export const generateAccountListInfo = (accounts: Account[]): Account[] => {
    const unique_currencies = new Set();
    accounts.forEach(a => {
        if (a.account_category === 'trading') {
            unique_currencies.add(a.currency);
        }
    });
    const currencies = Array.from(unique_currencies);
    const account_list = currencies.map(c => {
        return {
            account_category: 'wallet',
            account_type: 'doughflow',
            platform: 'dwallet',
            currency: c,
            landing_company: 'svg',
            link_accounts: accounts
                .filter(a => a.currency === c)
                .map(la => {
                    return {
                        loginid: la.loginid,
                        account_category: 'trading',
                        account_type: 'standard',
                        platform: la.platform,
                    };
                }),
        };
    });

    return account_list as Account[];
};
