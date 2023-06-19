import { InterceptedAPIHandler } from '../types/base';

export const loginGenerator = ({ ws, session }: InterceptedAPIHandler) => {
    let account_object: Record<string, any> = {};
    session.accounts.forEach(a => {
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
            loginid,
        } = a;

        if (loginid) {
            account_object[loginid] = {
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
                loginid,
            };
        }
    });

    const response = { ...account_object, active_loginid: session.active_account.loginid };

    return ws.send(JSON.stringify(response));
};
