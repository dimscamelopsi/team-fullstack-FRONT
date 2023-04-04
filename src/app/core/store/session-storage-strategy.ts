import { IStorageStrategy } from "./i-storage-strategy";
import { environment } from "./../../../environments/environment";

export class SessionStorageStrategy implements IStorageStrategy {
  private readonly _key: string = `${environment.storage.auth.key}`

  store(value: any): void {
    sessionStorage.setItem(this._key, JSON.stringify(value))
  }

  has(): boolean {
    return sessionStorage.getItem(this._key) !== null
  }

  retrieve(): any {
    if (this.has()) {
      const jsonValue: string | null =  sessionStorage.getItem(this._key)
      return JSON.parse(jsonValue!)
    }
    throw new Error(`No ${this._key} in local Storage`)
  }

  remove(): void {
    if (this.has()) {
      sessionStorage.removeItem(this._key)
    }
  }
}
