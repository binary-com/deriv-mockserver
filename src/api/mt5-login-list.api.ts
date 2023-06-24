import { InterceptedAPIHandler } from '../types/base.type';
import { MT5LoginListRequest } from '../types/mt5-login-list.type';

export const mt5LoginList = ({ data, ws }: InterceptedAPIHandler) => {
    const { mt5_login_list, req_id } = data as MT5LoginListRequest;

    const response = {
        echo_req: { mt5_login_list, req_id },
        msg_type: 'mt5_login_list',
        mt5_login_list: [],
        req_id,
    };

    return ws.send(JSON.stringify(response));
};
