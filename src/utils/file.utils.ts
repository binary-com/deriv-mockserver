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
            console.error('An error occured creating mock-data folder ' + e);
        }
    };

    export const serializeEntity = (mock_id: string, entity_name: string, entity_data: object) => {
        try {
            createMockFolder();
            const path_to_file = path.resolve(path.join(__dirname, mock_id, entity_name));
            fs.writeFileSync(path_to_file, JSON.stringify(entity_data));
        } catch (e) {
            console.error('An error occured: ' + e);
        }
    };

    export const loadEntity = (entity_name: string) => {};
}
