import { File } from '../utils/file.utils';

export class SerializableEntity {
    entity_name: string;

    constructor(entity_name: string) {
        this.entity_name = entity_name;
    }

    save(folder_path: string) {
        File.serializeEntity(folder_path, this.entity_name, this);
    }
}
