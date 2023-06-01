import { GenericRequest, GenericResponse } from "./base";
export interface AuthorizeResponse extends GenericResponse<AuthorizeRequest> {
  authorize: {
    account_list: Account[];
    balance: number;
    country: string;
    currency: string;
    email: string;
    fullname: string;
    is_virtual: 0 | 1;
    landing_company_fullname: string;
    landing_company_name: string;
    linked_to: LinkedAccount[];
    local_currencies: {
      [currencyCode: string]: {
        fractional_digits: number;
      };
    };
    loginid: string;
    preferred_language: null | string;
    scopes: string[];
    upgradeable_landing_companies: string[];
    user_id: number;
  };
}

export interface Account {
  account_category: "trading" | "wallet";
  account_type: string;
  created_at: number;
  currency: string;
  excluded_until?: number;
  is_disabled: 0 | 1;
  is_virtual: 0 | 1;
  landing_company_name: string;
  linked_to: LinkedAccount[];
  loginid: string;
}

interface LinkedAccount {
  loginid: string;
  platform: "derivez" | "dtrade" | "dwallet" | "dxtrade" | "mt5";
}
export interface AuthorizeRequest extends GenericRequest {
  authorize: string;
}
