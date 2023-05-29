import { InterceptorArgs } from ".";
import { Endpoints } from "../config/endpoints.config";

export const fullInterceptor = ({
  intercepted_property,
}: InterceptorArgs<(typeof Endpoints.fully_intercepted)[number]>) => {
  switch (intercepted_property) {
    case "wallet_migration":
      return;
  }
};
