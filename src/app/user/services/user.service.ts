import { Injectable } from '@angular/core';

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

  constructor() { }

  public get user(): any {
    if (this._user === undefined) {
      const jsonUser: string | null = sessionStorage.getItem('auth-key')

      if (jsonUser !== null) {
        this._user = JSON.parse(jsonUser)
      }
    }

    return this._user
  }

  public authenticate(credentials: any): boolean {
    this._user = users.find((user: any) =>
      user.login === credentials.login && user.password === credentials.password)

    if (this._user) {
      sessionStorage.setItem('auth-key', JSON.stringify(credentials))
    }
    return this._user !== undefined
  }
}
