import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';
import { APICollectionResponse } from './__common/models/APICollectionResponse.model';
import { APIItemResponse } from './__common/models/APIItemResponse.model';

@Injectable()
export class ResourcesService {
  constructor(private http: HttpClient) {}

  getCollection(resource: string): Observable<APICollectionResponse> {
    return this.http.get<APICollectionResponse>(`${environment.apiUrl}/${resource}`);
  }

  getItem(resource: string, id: number): Observable<APIItemResponse> {
    return this.http.get<APIItemResponse>(`${environment.apiUrl}/${resource}/${id}`);
  }

  postItem(resource: string, payload: any): Observable<APIItemResponse> {
    return this.http.post<APIItemResponse>(`${environment.apiUrl}/${resource}`, payload);
  }

  patchItem(resource: string, payload: any): Observable<APIItemResponse> {
    return this.http.patch<APIItemResponse>(`${environment.apiUrl}/${resource}/${payload.id}`, payload);
  }

  patchCollection(resource: string, payload: any): Observable<APICollectionResponse> {
    return this.http.post<APICollectionResponse>(`${environment.apiUrl}/${resource}/bulkPatch`, payload);
  }

  postCollection(resource: string, payload: any): Observable<APICollectionResponse> {
    return this.http.post<APICollectionResponse>(`${environment.apiUrl}/${resource}/bulkPost`, payload);
  }

  deleteItem(resource: string, id: number): Observable<APIItemResponse> {
    return this.http.delete<APIItemResponse>(`${environment.apiUrl}/${resource}/${id}`);
  }
}
