import { InterceptedAPIHandler } from '../types/base';

export const accountGenerator = ({ ws, session }: InterceptedAPIHandler) => {
    const response = session.accounts.map(a => {
        const {
            account_type,
            created_at,
            currency,
            is_disabled,
            is_virtual,
            landing_company_shortcode,
            trading,
            token,
            excluded_until,
            landing_company_name,
        } = a;
        return {
            account_type,
            created_at,
            currency,
            is_disabled,
            is_virtual,
            landing_company_shortcode,
            trading,
            token,
            excluded_until,
            landing_company_name,
        };
    });

    return ws.send(JSON.stringify(response));
};
