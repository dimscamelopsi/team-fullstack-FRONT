import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleAddType } from 'src/app/course/types/module-add-type';
import { ModuleType } from 'src/app/course/types/module-type';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private readonly endpoint: string = `${environment.apiRootUri}module`


  constructor(
    private _httpClient: HttpClient // DI Angular
  ) { }


  public add(module: ModuleAddType): Observable<any> {
    return this._httpClient.post<ModuleAddType>(
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
