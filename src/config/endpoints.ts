export namespace Endpoints {
  export const partial_intercepted = [
    "authorize",
    "get_available_accounts_to_transfer",
    "new_account_real",
    "new_account_virtual",
    "new_account_wallet",
    "transfer_between_accounts",
  ] as const;

  export const fully_intercepted = ["wallet_migration"] as const;
}
