import { InterceptorArgs } from ".";
import { authorize } from "../api/partial/authorize";
import { Endpoints } from "../config/endpoints.config";

export type PartialArgs = Omit<
  InterceptorArgs<(typeof Endpoints.partial_intercepted)[number]>,
  "intercepted_property"
>;

export const partialInterceptor = ({
  intercepted_property,
  ...forwarded_data
}: InterceptorArgs<(typeof Endpoints.partial_intercepted)[number]>) => {
  switch (intercepted_property) {
    case "authorize":
      return authorize(forwarded_data);

    case "get_available_accounts_to_transfer":
    case "new_account_real":
    case "new_account_virtual":
    case "new_account_wallet":
    case "transfer_between_accounts":
    default:
      return;
  }
};
