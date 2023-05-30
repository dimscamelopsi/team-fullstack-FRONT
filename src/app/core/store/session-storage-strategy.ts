import { IStorageStrategy } from "./i-storage-strategy";
import { environment } from "./../../../environments/environment";

export class SessionStorageStrategy implements IStorageStrategy {
  private readonly _key: string = `${environment.storage.auth.key}`

  /**
  * Stores the value in session storage.
  * @param value - The value to store.
  */
  store(value: any): void {
    sessionStorage.setItem(this._key, JSON.stringify(value))
  }


  /**
  * Checks if the key exists in session storage.
  * @returns A boolean indicating if the key exists.
  */
  has(): boolean {
    return sessionStorage.getItem(this._key) !== null
  }


  /**
 * Retrieves the value from session storage.
 * @returns The retrieved value, or undefined if the key doesn't exist.
 */
  retrieve(): any {
    if (this.has()) {
      const jsonValue: string | null = sessionStorage.getItem(this._key)
      return JSON.parse(jsonValue!)
    }
    return undefined
  }


  /**
   * Removes the key from session storage.
   */
  remove(): void {
    if (this.has()) {
      sessionStorage.removeItem(this._key)
    }
  }
}
