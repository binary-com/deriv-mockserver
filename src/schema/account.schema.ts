import { z } from 'zod';

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

export type Account = z.infer<typeof account_schema>;
export type LinkedAccount = z.infer<typeof linked_account_schema>;

export const linked_account_schema = z.object({
    loginid: z.string(),
    platform: z.nativeEnum(Platform),
});

export const account_schema = z.object({
    account_category: z.nativeEnum(AccountCategory),
    account_type: z.string(),
    created_at: z.number(),
    currency: z.string().regex(/\b[A-Za-z]{3,4}\b/),
    excluded_until: z.number(),
    is_disabled: z.number(),
    is_virtual: z.number(),
    landing_company_name: z.string().regex(/(bvi|labuan|malta|maltainvest|svg|vanuatu)/),
    loginid: z.string(),
    linked_account: linked_account_schema,
});
