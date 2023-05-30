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

  /**
   * Fetches all media from the server.
   * @returns An Observable emitting an array of MediaType objects.
   */
  public findAllMedias(): Observable<MediaType[]> {
    return this._httpClient.get<MediaType[]>(
      this.endpoint
    )
  }

  /**
  * Adds a new media to the server.
  * @param media The media to be added, as FormData.
  * @returns An Observable emitting the response from the server.
  */
  public add(media: FormData): Observable<any> {
    return this._httpClient.post<FormData>(
      this.endpoint,
      media
    )
  }
}
