export interface IStore {
  /**
   * Stores a value in the store.
   * @param key - The key under which to store the value.
   * @param value - The value to store.
   */
  store(key: string, value: string): void;

  /**
   * Checks if a key exists in the store.
   * @param key - The key to check.
   * @returns A boolean indicating if the key exists in the store.
   */
  has(key: string): boolean;

  /**
   * Retrieves a value from the store.
   * @param key - The key of the value to retrieve.
   * @returns The retrieved value, or undefined if the key doesn't exist.
   */
  retrieve(key: string): any;

  /**
   * Removes a value from the store.
   * @param key - The key of the value to remove.
   */
  remove(key: string): void;
}
