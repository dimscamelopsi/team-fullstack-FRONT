import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeMediaType } from 'src/app/course/types/type-media-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class TypeMediaService {
  private readonly endpoint: string = `${environment.apiRootUri}typeMedia`
  constructor(
    private _httpClient: HttpClient
  ) { }


  /**
   * Fetches all types of media from the server.
   * @returns An Observable emitting an array of TypeMediaType objects.
   */
  getAllTypesMedia(): Observable<TypeMediaType[]> {
    return this._httpClient.get<TypeMediaType[]>(
      this.endpoint
    )
  }
}
