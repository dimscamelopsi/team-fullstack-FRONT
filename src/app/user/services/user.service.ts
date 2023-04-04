import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { IStorageStrategy } from './../../core/store/i-storage-strategy';
import { SessionStorageStrategy } from './../../core/store/session-storage-strategy';
import { LocalStorageStrategy } from './../../core/store/local-storage-strategy';

const users: Array<any> = [
  {
    login: 'bond',
    password: '007'
  },
  {
    login: 'bonissel',
    password: 'oss117'
  }
]
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: any = undefined
  private _storageStrategy: IStorageStrategy

  constructor() {
    this._storageStrategy = environment.storage.auth.strategy === 'session' ?
      new SessionStorageStrategy() :
      new LocalStorageStrategy()
  }

  public set storageStrategy(strategy: IStorageStrategy) {
    this._storageStrategy = strategy
  }

  public get user(): any {
    if (this._user === undefined) {
      this._user = this._storageStrategy.retrieve()
    }

    return this._user
  }

  public authenticate(credentials: any): boolean {
    this._user = users.find((user: any) =>
      user.login === credentials.login && user.password === credentials.password)

    if (this._user) {
      this._storageStrategy.store(credentials)
    }
    return this._user !== undefined
  }
}
