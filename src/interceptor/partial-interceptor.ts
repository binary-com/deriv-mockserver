import { Endpoints } from "../config/endpoints";

/**
 *
 * @param data
 * @param api_type
 * @returns
 */
export const partialInterceptor = (
  data: unknown,
  api_type: (typeof Endpoints.partial_intercepted)[number]
) => {
  switch (api_type) {
    case "authorize":
    case "get_account_types":
    case "get_available_accounts_to_transfer":
    case "new_account_real":
    case "new_account_virtual":
    case "new_account_wallet":
      return;
  }
};
