import { getFirstMatchingKey } from '../utils/object.utils';
import { intercepted_endpoints } from '../config/intercepted-endpoints.config';
import { authorize } from '../api/authorize.api';
import { transaction } from '../api/transaction.api';
import { walletMigration } from '../api/wallet-migration';
import { statement } from '../api/statement.api';
import { InterceptedAPIHandler } from '../types/base.type';
import { getAccountStatus } from '../api/get-account-status.api';
import { proxyInterceptor } from './proxy.interceptor';
import { balance } from '../api/balance.api';
import { mt5LoginList } from '../api/mt5-login-list.api';
import { tradingPlatformAvailableAccounts } from '../api/trading-platform-available-accounts.api';
import { tradingServers } from '../api/trading-servers.api';
import { getSettings } from '../api/get-settings.api';
import { payoutCurrencies } from '../api/payout-currencies.api';
import { getAccountTypes } from '../api/get-account-types';

export const mockInterceptor = async (intercepted_args: InterceptedAPIHandler) => {
    const endpoint_type = getFirstMatchingKey(
        intercepted_args.data,
        intercepted_endpoints
    ) as (typeof intercepted_endpoints)[number];

    switch (endpoint_type) {
        case 'authorize':
            return await authorize(intercepted_args);
        case 'transaction':
            return await transaction(intercepted_args);
        case 'statement':
            return await statement(intercepted_args);
        case 'get_account_status':
            return await getAccountStatus(intercepted_args);
        case 'get_account_types':
            return await getAccountTypes(intercepted_args);
        case 'get_settings':
            return await getSettings(intercepted_args);
        case 'balance':
            return await balance(intercepted_args);
        case 'trading_servers':
            return await tradingServers(intercepted_args);
        case 'trading_platform_available_accounts':
            return await tradingPlatformAvailableAccounts(intercepted_args);
        case 'mt5_login_list':
            return await mt5LoginList(intercepted_args);
        case 'wallet_migration':
            return await walletMigration(intercepted_args);
        case 'payout_currencies':
            return await payoutCurrencies(intercepted_args);
        case 'topup_virtual':
        case 'account_security':
        case 'portfolio':
        case 'get_limits':
        case 'proposal_open_contract':
        case 'new_account_real':
        case 'new_account_virtual':
        case 'new_account_wallet':
        case 'get_self_exclusion':
        case 'get_available_accounts_to_transfer':
        case 'transfer_between_accounts':
        case 'p2p_order_list':
        case 'get_financial_assessment':
        case 'trading_platform_accounts':
            return;
        default:
            return await proxyInterceptor(intercepted_args);
    }
};
