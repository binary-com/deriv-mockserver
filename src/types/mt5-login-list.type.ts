import { GenericRequest } from './base.type';

export interface MT5LoginListRequest extends GenericRequest {
    mt5_login_list: 0 | 1;
}
