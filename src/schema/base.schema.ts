import { z } from 'zod';

export const base_request_schema = z.object({
    req_id: z.number(),
});

export const base_response_schema = z.object({
    req_id: z.number(),
});
