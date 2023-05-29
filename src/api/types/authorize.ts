import { GenericClientRequest, Response } from "./base";

export interface BaseAccount {
  account_id: string;
  balance: string;
  currency: string;
}

export interface Wallet extends BaseAccount {
  payment_method: string;
}

export interface App extends BaseAccount {
  platform: string;
}

export interface Account {
  account_category: string;
  account_type: string;
  created_at: number;
  currency: string;
  excluded_until: number;
  is_disabled: 0 | 1;
  is_virtual: 0 | 1;
  landing_company_name: string;
  login_id: string;
  trading?: {
    linked_to: Wallet[];
  };
  wallet?: {
    linked_to: App[];
  };
}

export interface AuthorizeRequest extends GenericClientRequest {
  authorize: string;
}

export interface AuthorizeResponse
  extends Response<AuthorizeRequest, "authorize"> {
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
    local_currencies: object;
    loginid: string;
    preferred_language: string;
    scopes: string;
    upgradeable_landing_companies: string[];
    user_id: number;
  };
}
