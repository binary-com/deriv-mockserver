import crypto from 'crypto';

export namespace CryptoUtils {
    export const generateHash = (string_to_hash: string) => {
        return crypto.createHash('shake256', { outputLength: 16 }).update(string_to_hash, 'utf-8').digest('hex');
    };
}
