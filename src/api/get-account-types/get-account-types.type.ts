import { GenericRequest } from '../../types/base.type';

export interface GetAccountTypesRequest extends GenericRequest {
    get_account_types: 0 | 1;
    company?: 'maltainvest' | 'svg';
}
