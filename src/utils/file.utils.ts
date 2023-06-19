import fs from 'fs';
import path from 'path';

export namespace FileUtil {
    export const MOCK_STORE_PATH = path.resolve(path.join(__dirname, '../mock-store'));

    const createSessionFolder = (session_id: string) => {
        try {
            const session_folder = path.resolve(path.join(MOCK_STORE_PATH, session_id));
            fs.access(session_folder, error => {
                if (error) {
                    fs.mkdir(session_folder, () => console.log(`Session id: ${session_id} store created`));
                }
            });
        } catch (e) {
            console.error('An error occured creating mock-data folder: ' + e);
        }
    };

    export const getPersistedSessionList = () => {
        return fs
            .readdirSync(MOCK_STORE_PATH)
            .filter(folder_name => fs.lstatSync(path.join(MOCK_STORE_PATH, folder_name)).isDirectory());
    };

    export const serializeEntity = (session_id: string, entity_name: string, entity_data: object) => {
        try {
            createSessionFolder(session_id);
            const path_to_file = path.resolve(path.join(MOCK_STORE_PATH, session_id, `${entity_name}.json`));
            fs.writeFileSync(path_to_file, JSON.stringify(entity_data));
        } catch (e) {
            console.error(`An error occured serializing entity: ${entity_name}` + e);
        }
    };

    export const loadEntity = (session_id: string, entity_name: string) => {
        try {
            const path_to_file = path.resolve(path.join(MOCK_STORE_PATH, session_id, `${entity_name}.json`));
            const file_data = fs.readFileSync(path_to_file, 'utf-8');
            return JSON.parse(file_data);
        } catch (e) {
            console.error(`An error occured loading entity: ${entity_name}` + e);
        }
    };
}
