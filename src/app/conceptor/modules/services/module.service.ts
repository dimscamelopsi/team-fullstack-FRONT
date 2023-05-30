import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModuleAddType } from 'src/app/course/types/module-add-type';
import { ModuleManageType } from 'src/app/course/types/module-manage-type';
import { ModuleType } from 'src/app/course/types/module-type';
import { UserService } from 'src/app/user/services/user.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private readonly endpoint: string = `${environment.apiRootUri}module`


  constructor(
    private _httpClient: HttpClient,
    private _userService: UserService
  ) { }

  /**
   * Adds a new module to the server.
   * @param module The module to be added.
   * @returns An Observable emitting the response from the server.
   */
  public add(module: ModuleAddType): Observable<any> {
    return this._httpClient.post<ModuleAddType>(
      this.endpoint,
      module
    )
  }

  /**
 * Adds a new module to the server.
 * @param module The module to be added.
 * @returns An Observable emitting the response from the server.
 */
  public addModule(module: ModuleType): Observable<any> {
    return this._httpClient.post<ModuleType>(
      this.endpoint,
      module
    )
  }

  /**
 * Fetches all modules from the server.
 * @returns An Observable emitting an array of ModuleType objects.
 */
  public findAllModules(): Observable<ModuleType[]> {
    return this._httpClient.get<ModuleType[]>(
      this.endpoint
    )
  }

  /**
 * Fetches modules by person ID from the server.
 * @returns An Observable emitting an array of ModuleType objects.
 */
  public findModulesByPersonId(): Observable<ModuleType[]> {
    return this._httpClient.get<ModuleType[]>(
      this.endpoint + '/' + this._userService.user.id)
  }


  /**
 * Removes a module from the server.
 * @param id The ID of the module to be removed.
 * @returns An Observable emitting the response from the server.
 */
  public remove(id: number): Observable<HttpResponse<any>> {
    return this._httpClient.delete<ModuleType>(
      `${this.endpoint}/${id}`, { observe: 'response' }
    )
  }


  /**
  * Updates a module on the server.
  * @param module The updated module.
  * @returns An Observable emitting the response from the server.
  */
  public update(module: ModuleManageType): Observable<HttpResponse<any>> {
    return this._httpClient.put<ModuleType>(
      this.endpoint + '/' + module.id, module, { observe: 'response' })
  }
}
