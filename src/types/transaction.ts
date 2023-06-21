import { GenericResponse } from './base.type';

export enum TransactionAction {
    Buy = 'buy',
    Sell = 'sell',
    Deposit = 'deposit',
    Withdrawal = 'withdrawal',
    Escrow = 'escrow',
    Adjustment = 'adjustment',
    VirtualCredit = 'virtual_credit',
    Transfer = 'transfer',
}

export interface TransactionResponse extends GenericResponse<TransactionRequest> {
    transaction: {
        action: TransactionAction;
        amount: number;
        balance: number;
        barrier?: number | string;
        contract_id?: number;
        currency: string;
        date_expiry: number;
        display_name: string;
        high_barrier?: number | string;
        id: string;
        longcode: string;
        low_barrier?: string;
        purchase_time?: number;
        stop_loss?: string;
        stop_out?: string;
        symbol: string;
        take_profit?: string;
        transaction_id: number;
        transaction_time: number;
    };
}

export interface TransactionRequest {
    transaction: number;
}
