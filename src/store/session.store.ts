import { DerivApi, createDerivWSInstance } from '../config/deriv-api.config';
import { Account } from '../schema/account.schema';
import { WalletMigrationStatus } from '../types/wallet-migration';
import { CryptoUtils } from '../utils/crypto.utils';
import { FileUtil } from '../utils/file.utils';
import { SerializableEntity } from './base.store';

type StoredSessionData = {
    accounts: Account[];
    active_account: Account;
    wallet_migration_config: {
        status?: WalletMigrationStatus;
        has_real_usd_account?: boolean;
        has_p2p_account?: boolean;
        has_used_pa_last_3months?: boolean;
        is_payment_agent?: boolean;
    };
};

export class Session implements SerializableEntity {
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

    constructor(session_id: string, data: Partial<StoredSessionData> = {}) {
        const { accounts = [], active_account = {}, wallet_migration_config = {} } = data;
        this.session_id = session_id;
        this.deriv_api = createDerivWSInstance();
        this.accounts = accounts.map(a => {
            if (!('token' in a) && a.loginid) {
                a.token = CryptoUtils.generateHash(a.loginid);
            }
            return a;
        });
        this.active_account = active_account && this.accounts[0];
        this.wallet_migration_config = wallet_migration_config;
    }

    authorize(token: string) {
        const matching_account = this.accounts.find(a => a.token === token);
        if (matching_account) {
            this.active_account = matching_account;
        }
        return matching_account;
    }

    addAccounts(accounts: Account[]) {
        this.accounts = [...this.accounts, ...accounts];
    }

    getAccountByToken(token: string) {
        return this.accounts.find(account => account.token === token);
    }

    save() {}
}

export class SessionManager {
    sessions: Session[] = [];

    constructor() {
        this.#loadPersistedSessions();
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

    #loadPersistedSessions() {
        const persisted_session_list = FileUtil.getPersistedSessionList();
        const loaded_sessions: Session[] = [];
        persisted_session_list.forEach(s => {
            const loaded_object = FileUtil.loadEntity(s, 'session') as StoredSessionData;
            if (loaded_object) {
                const new_session = new Session(s, { ...loaded_object });
                loaded_sessions.push(new_session);
            }
        });
        this.sessions = loaded_sessions;
    }
}

export default new SessionManager();
