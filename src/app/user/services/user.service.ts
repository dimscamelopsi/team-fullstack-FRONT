import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { IStorageStrategy } from './../../core/store/i-storage-strategy';
import { SessionStorageStrategy } from './../../core/store/session-storage-strategy';
import { LocalStorageStrategy } from './../../core/store/local-storage-strategy';
import { BehaviorSubject, Observable, take, tap } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

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
  private _user$: BehaviorSubject<any  | undefined> = new BehaviorSubject(undefined)

  private _storageStrategy: IStorageStrategy

  constructor(
    private _httpClient: HttpClient
  ) {
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

  public get user$() {
    return this._user$
  }

  public authenticate(credentials: any): Observable<HttpResponse<any>> {
    const endPoint: string = `${environment.apiRootUri}user/byEmailAndPassword`
    return this._httpClient.post<any>(
      endPoint,
      credentials,
      {
        observe: 'response'
      }
    ).pipe(
      take(1),
      tap((response: HttpResponse<any>) => {
        if (response.status === 200) {
          this._user = response.body
          this._storageStrategy.store(credentials)
          this._user$.next(this._user)
        }
      })
    )
  }

  public logout(): void {
    this._storageStrategy.remove()
    this._user = undefined
    this._user$.next(this._user)
    // Fallback to default strategy
    this._storageStrategy = environment.storage.auth.strategy === 'session' ?
      new SessionStorageStrategy() :
      new LocalStorageStrategy()
  }
}
