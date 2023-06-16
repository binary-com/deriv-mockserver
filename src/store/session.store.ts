import { DerivApi, createDerivWSInstance } from '../config/deriv-api.config';
import { Account } from '../schema/account.schema';
import { WalletMigrationStatus } from '../types/wallet-migration';
import { SerializableEntity } from './base.store';

export class Session extends SerializableEntity {
    session_id: string;
    deriv_api: DerivApi;
    accounts: Account[];
    active_account: Account;
    wallet_migration_config: {
        status?: WalletMigrationStatus;
        has_real_usd_account?: boolean;
        has_p2p_account?: boolean;
        has_used_pa_last_3months?: boolean;
        is_payment_agent?: boolean;
    };

    constructor(session_id: string, accounts: Account[] = [], wallet_migration_config = {}) {
        super('session');
        this.session_id = session_id;
        this.deriv_api = createDerivWSInstance();
        this.accounts = accounts;
        this.active_account = {};
        this.wallet_migration_config = wallet_migration_config;
    }

    authorize(token: string) {
        const matching_account = this.accounts.find(a => a.token === token);
        if (matching_account) {
            this.active_account = matching_account;
        }
    }

    addAccounts(accounts: Account[]) {
        this.accounts = [...this.accounts, ...accounts];
    }

    getAccountByToken(token: string) {
        return this.accounts.find(account => account.token === token);
    }
}

export class SessionManager {
    sessions: Session[] = [];

    constructor() {
        this.#load();
    }

    createNewSession(session_id: string) {
        const new_session = new Session(session_id);
        this.sessions.push(new_session);
        return new_session;
    }

    getMatchingSession(session_id: string) {
        const matching_session = this.sessions.find(s => s.session_id === session_id);
        return matching_session ? matching_session : this.createNewSession(session_id);
    }

    #load() {
        this.sessions = [];
    }
}

export default new SessionManager();
