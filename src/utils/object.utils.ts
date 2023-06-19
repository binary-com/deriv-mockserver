/**
 * Returns first key match of the keys argument,
 * @param data object to search for matching key
 * @param keys_to_match array of keys or a string key
 * @returns first matching key
 */
export const getFirstMatchingKey = (data: object, keys_to_match: string | readonly string[] | string[]) => {
    if (Array.isArray(keys_to_match)) {
        return keys_to_match.find(key => Object.keys(data).includes(key));
    } else {
        return Object.keys(data).find(property => property === keys_to_match);
    }
};
