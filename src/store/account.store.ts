import { AccountDTO } from '../schema/account.schema';

export type MockedAccount = {
    mock_id: string;
    accounts: AccountDTO[];
};

const mocked_account: MockedAccount[] = [];

export namespace MappedAccount {
    export const add = (new_account: MockedAccount) => {
        let matching_account = mocked_account.find(acc => acc.mock_id === new_account.mock_id);
        if (!matching_account) {
            mocked_account.push;
        }
    };

    export const get = (mock_id: string) => mocked_account.find(acc => acc.mock_id === mock_id)?.accounts;
}
