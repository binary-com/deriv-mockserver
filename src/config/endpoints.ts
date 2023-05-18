export namespace Endpoints {
  export const partial_intercepted = [
    "authorize",
    "new_account_real",
    "new_account_virtual",
    "new_account_wallet",
    "get_account_types",
    "get_available_accounts_to_transfer",
  ] as const;

  export const fully_intercepted = ["wallet_migration"] as const;
}
