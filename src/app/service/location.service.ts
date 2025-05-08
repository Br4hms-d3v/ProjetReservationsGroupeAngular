import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Location } from '../model/LocationModel';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiServerUrl = 'http://localhost:8080/api'

  constructor(private _http: HttpClient) { }

  getLocations(): Observable<Location[]> {
    return this._http.get<Location[]>(`${this.apiServerUrl}/locations`);
  }
}
