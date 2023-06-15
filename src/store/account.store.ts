import { Account } from '../schema/account.schema';

export type MockedAccount = {
    session_id: string;
    accounts: Account[];
};

const mocked_account: MockedAccount[] = [];

export namespace AccountStore {
    export const add = (new_account: MockedAccount) => {
        let matching_account = mocked_account.find(acc => acc.session_id === new_account.session_id);
        if (!matching_account) {
            mocked_account.push(new_account);
        }
    };

    export const get = (session_id: string) => mocked_account.find(acc => acc.session_id === session_id)?.accounts;
}
