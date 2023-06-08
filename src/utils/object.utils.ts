/**
 * Returns first key match of the keys argument,
 * @param data object to search for matching key
 * @param keys array of keys or a string key
 * @returns first matching key
 */
export const getMatchingKeys = (data: object, keys: string | readonly string[] | string[]) => {
    if (Array.isArray(keys)) {
        return keys.find(key => Object.keys(data).includes(key));
    } else {
        return Object.keys(data).find(property => property === keys);
    }
};
