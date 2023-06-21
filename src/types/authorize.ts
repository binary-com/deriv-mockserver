import { Account, LinkedAccount } from '../schema/account.schema';
import { GenericRequest, GenericResponse } from './base.type';

export enum AccountCategory {
    Trading = 'trading',
    Wallet = 'wallet',
}

export enum Platform {
    DerivEZ = 'derivez',
    DTrader = 'dtrader',
    DWallet = 'dwallet',
    DXTrade = 'dxtrade',
    MT5 = 'mt5',
}

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

export interface AuthorizeRequest extends GenericRequest {
    authorize: string;
}
