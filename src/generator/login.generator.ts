import { GenericRequest, InterceptedAPIHandler } from '../types/base.type';

export const loginGenerator = ({ ws, session, data }: InterceptedAPIHandler) => {
    const { req_id } = data as GenericRequest;
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

    const response = { echo_req: data, ...account_object, active_loginid: session.active_account.loginid, req_id };
    ws.send(JSON.stringify(response));
};
