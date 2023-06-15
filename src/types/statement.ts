import { GenericRequest, GenericResponse } from './base';

export enum StatementAction {
    Buy = 'buy',
    Sell = 'sell',
    Deposit = 'deposit',
    Withdrawal = 'withdrawal',
    Hold = 'hold',
    Release = 'release',
    Adjustment = 'adjustment',
    VirtualCredit = 'virtual_credit',
    Transfer = 'transfer',
}

export interface StatementRequest extends GenericRequest {
    statement: 1;
    action_type?: StatementAction;
    date_from?: number;
    date_to?: number;
    description?: 0 | 1;
    limit?: number;
    offset?: number;
}

export interface StatementResponse extends GenericResponse<any> {
    transaction: {
        action_type: StatementAction;
        amount: number;
        app_id?: number;
        balance_after: number;
        contract_id?: number;
        fees?: {
            amount: number;
            currency: string;
            minimum: number;
            percentage: number;
        };
        from?: {
            loginid: string;
        };
        longcode?: string;
        payout?: number;
        purchase_time?: number;
        reference_id?: number;
        shortcode?: string;
        to?: {
            loginid: string;
        };
        transaction_id: number;
        transaction_time: number;
        withdrawal_details?: string;
    };
}
