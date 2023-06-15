import { DerivApi, createDerivWSInstance } from '../config/deriv-api.config';
import { WalletMigrationStatus } from '../types/wallet-migration';

export type Session = {
    session_id: string;
    token?: string;
    deriv_api: DerivApi;
    wallet_migration_config?: {
        status?: WalletMigrationStatus;
        has_real_usd_account?: boolean;
        has_p2p_account?: boolean;
        has_used_pa_last_3months?: boolean;
        is_payment_agent?: boolean;
    };
};

export const session_list: Session[] = [];

export const getMatchingSession = (parsed_data: any): Session => {
    const { session_id = '' } = parsed_data;
    const matching_session = session_list.find(c => c.session_id === session_id);
    return matching_session ? matching_session : createClientSession(session_id);
};

export const createClientSession = (session_id: string): Session => {
    const new_session = {
        session_id,
        deriv_api: createDerivWSInstance(),
    };
    session_list.push(new_session);
    return new_session;
};
