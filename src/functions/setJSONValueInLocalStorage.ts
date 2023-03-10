/**
 * A helper function to get a value from localStorage. If there is a value it calls `JSON.parse` on it, if not it returns `null`
 *
 * @export
 * @template DataType The type of data that is stored as JSON in localStorage
 * @param key The key where the data is stored
 */
export function setJSONValueInLocalStorage(key: string, data: any): void {
  const stringValue = JSON.stringify(data);
  localStorage.setItem(key, stringValue);
};
