import fs from 'fs';
import path from 'path';

export namespace File {
    const createMockFolder = () => {
        try {
            const mock_data_folder = path.resolve(__dirname, 'mock-data');
            fs.access(mock_data_folder, () =>
                fs.mkdir(mock_data_folder, () => console.log('mock-data folder created'))
            );
        } catch (e) {
            console.error('An error occured creating mock-data folder: ' + e);
        }
    };

    export const serializeEntity = (folder_path: string, entity_name: string, entity_data: object) => {
        try {
            createMockFolder();
            const path_to_file = path.resolve(path.join(__dirname, folder_path, entity_name));
            fs.writeFileSync(path_to_file, JSON.stringify(entity_data));
        } catch (e) {
            console.error(`An error occured serializing entity: ${entity_name}` + e);
        }
    };

    export const loadEntity = <T extends object>(folder_path: string, entity_name: string) => {
        try {
            const path_to_file = path.resolve(path.join(__dirname, folder_path, entity_name));
            const file_data = fs.readFileSync(path_to_file, 'utf-8');
            return JSON.parse(file_data) as T;
        } catch (e) {
            console.error(`An error occured loading entity: ${entity_name}` + e);
        }
    };
}
