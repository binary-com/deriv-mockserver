import { GenericRequest } from './base.type';

export interface NewAccountWalletRequest extends GenericRequest {
    new_account_wallet: 1;
    address_city?: string;
    address_line_1?: string;
    address_line_2?: string;
    address_postcode?: string;
    date_of_birth?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    non_pep_declaration?: string;
    account_type: 'doughflow' | 'crypto';
    currency: string;
}
