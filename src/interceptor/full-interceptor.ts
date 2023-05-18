import { Endpoints } from "../config/endpoints";

/**
 *
 * @param data
 * @param api_type
 * @returns
 */
export const fullInterceptor = (
  data: unknown,
  api_type: (typeof Endpoints.fully_intercepted)[number]
) => {
  switch (api_type) {
    case "wallet_migration":
      return;
  }
};
