import { IStorageStrategy } from "./i-storage-strategy";
import { environment } from "./../../../environments/environment";

export class LocalStorageStrategy implements IStorageStrategy {
  private readonly _key: string = `${environment.storage.auth.key}`

  store(value: any): void {
    localStorage.setItem(this._key, JSON.stringify(value))
  }

  has(): boolean {
    return localStorage.getItem(this._key) !== null
  }

  retrieve(): any {
    if (this.has()) {
      const jsonValue: string | null =  localStorage.getItem(this._key)
      return JSON.parse(jsonValue!)
    }
    return undefined
  }

  remove(): void {
    if (this.has()) {
      localStorage.removeItem(this._key)
    }
  }
}
