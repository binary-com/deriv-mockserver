import { GenericRequest } from './base.type';

export interface TopUpVirtualRequest extends GenericRequest {
    topup_virtual: 1;
}
