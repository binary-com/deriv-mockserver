import { z } from 'zod';
import { base_request_schema } from './base.schema';

export type Balance = z.infer<typeof balance_schema>;

export const balance_schema = base_request_schema
    .extend({
        balance: z.number(),
        account: z.string().regex(/^(all|current|(MX|MXW|MF|MFW|VRTC|VRW|MLT|MLTW|CR|CRW|FOG)[0-9]+)$/),
    })
    .partial();
