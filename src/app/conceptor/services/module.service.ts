import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModuleType } from '../types/module-type';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private readonly endpoint: string = `${environment.apiRootUri}module`


  constructor(
    private _httpClient: HttpClient // DI Angular
  ) { }


  public add(module: ModuleType): Observable<any> {
    return this._httpClient.post<ModuleType>(
      this.endpoint,
      module
    )
  }

  public findAllModules(): Observable<ModuleType[]> {
    return this._httpClient.get<ModuleType[]>(
      this.endpoint
    )
  }
}
