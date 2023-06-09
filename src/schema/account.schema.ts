import { z } from 'zod';

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
    account_category: z.enum(['trading', 'wallet']),
    account_type: z.string(),
    platform: z.nativeEnum(Platform),
});

export const account_schema = z
    .object({
        account_category: z.enum(['trading', 'wallet']),
        account_type: z.string(),
        created_at: z.number(),
        currency: z.string().regex(/\b[A-Za-z]{3,4}\b/),
        excluded_until: z.number(),
        is_disabled: z.number(),
        is_virtual: z.number(),
        landing_company_name: z.string().regex(/(bvi|labuan|malta|maltainvest|svg|vanuatu)/),
        loginid: z.string().regex(/^(MX|MXW|MF|MFW|VRTC|VRW|MLT|MLTW|CR|CRW|FOG)[0-9]+$/),
        linked_account: linked_account_schema,
        trading: z.any().optional(),
        token: z.string().optional(),
        // Full Account Details
        balance: z.number(),
        platform: z.string(),
        email: z.string(),
        fullname: z.string(),
        landing_company_fullname: z.string(),
        local_currencies: z.any(),
        preferred_language: z.string(),
        landing_company_shortcode: z.string(),
        scopes: z.array(z.string().regex(/(read|trade|trading_information|payments|admin)/)),
        upgradeable_landing_companies: z.array(z.string().regex(/(bvi|labuan|malta|maltainvest|svg|vanuatu)/)),
        user_id: z.string(),
        accepted_bch: z.string(),
    })
    .partial();
