import SessionStore from '../store/session.store';
import { InterceptedAPIHandler } from '../types/base.type';

export const sessionList = ({ data, ws, session }: InterceptedAPIHandler) => {
    const { req_id } = data;
    const session_id_list = SessionStore.sessions.map(s => s.session_id);
    ws.send(
        JSON.stringify({
            echo_req: data,
            session_list: session_id_list,
            req_id,
        })
    );
};
