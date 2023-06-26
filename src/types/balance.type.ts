import { GenericSubscribeResponse, GenericSubscribeRequest } from './base.type';

export interface BalanceRequest extends GenericSubscribeRequest {
    account: string;
    balance: number;
}

export interface BalanceSpecific {
    balance: number;
    currency: string;
    id: string;
    loginid: string;
}
export interface BalanceAll {
    accounts: Record<
        string,
        {
            balance: number;
            converted_amount: number;
            currency: string;
            demo_account: 0 | 1;
            status: 0 | 1;
            type: string;
        }
    >;
    balance: number;
    currency: string;
    id: string;
    loginid: string;
    total: Record<
        string,
        {
            amount: number;
            currency: string;
        }
    >;
}

export interface BalanceResponse<T extends 'all' | 'specific'>
    extends GenericSubscribeResponse<Omit<BalanceRequest, 'session_id'>> {
    balance: T extends 'all' ? BalanceAll : BalanceSpecific;
    msg_type: 'balance';
}
