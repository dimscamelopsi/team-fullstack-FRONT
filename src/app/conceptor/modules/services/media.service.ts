import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddMediaType } from 'src/app/course/types/add-media-type';
import { MediaType } from 'src/app/course/types/media-type';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private readonly endpoint: string = `${environment.apiRootUri}media`

  constructor(
    private _httpClient: HttpClient // DI Angular
  ) { }

  public findAllMedias(): Observable<MediaType[]> {
    return this._httpClient.get<MediaType[]>(
      this.endpoint
    )
  }
  public add(media: AddMediaType) : Observable<any> {
    return this._httpClient.post<AddMediaType>(
      this.endpoint,
      media
    )
  }
}
