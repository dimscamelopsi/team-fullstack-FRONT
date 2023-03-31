import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseListType } from '../types/course-list-type';
import { environment } from './../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private readonly endPoint: string = `${environment.apiRootUri}course`

  constructor(private _httpClient: HttpClient) { }

  public findFullCourses(): Observable<CourseListType[]> {
    return this._httpClient.get<CourseListType[]>(
      this.endPoint
    )
  }

  public remove(id: number): Observable<HttpResponse<any>> {
    return this._httpClient.delete<CourseListType>(
      `${this.endPoint}/${id}`,
      {
        observe: 'response'
      }
    )
  }
}
