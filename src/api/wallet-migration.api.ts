import { MappedAccount } from "../store/account.store";
import { Account } from "../types/authorise";
import { InterceptedAPIHandler } from "../types/base";
import {
  WalletMigrationResponse,
  WalletMigrationStatus,
  WalletRequest,
} from "../types/wallet-migration";

const generateWalletMigrationResponse = ({
  data,
  wallet_accounts,
  status,
}: Pick<InterceptedAPIHandler, "data"> & {
  wallet_accounts: Account[] | undefined;
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
    msg_type: "wallet_migration",
  };

  return reponse;
};

export const walletMigration = ({
  data,
  ws,
  client,
}: InterceptedAPIHandler) => {
  const client_account_list = MappedAccount.get(client.mock_id);
  const wallet_accounts = client_account_list?.filter(
    (w) => w.account_category === "wallet"
  );

  if (client.wallet_migration_config) {
    const {
      has_real_usd_account,
      has_p2p,
      has_used_pa_last_3months,
      is_payment_agent,
    } = client.wallet_migration_config;

    if (
      has_real_usd_account &&
      !has_p2p &&
      !has_used_pa_last_3months &&
      !is_payment_agent
    ) {
      return ws.send(
        JSON.stringify(
          generateWalletMigrationResponse({
            data,
            wallet_accounts,
            status: "ineligible",
          })
        )
      );
    }
  }

  return ws.send(
    JSON.stringify(
      generateWalletMigrationResponse({
        data,
        wallet_accounts,
        status: "ineligible",
      })
    )
  );
};
