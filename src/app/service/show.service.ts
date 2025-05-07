import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Show} from "../model/ShowModel";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private apiServerUrl = 'http://localhost:8080/api'

  constructor(private _http: HttpClient) { }

  getAllShows() {
    return this._http.get<Show[]>(`${this.apiServerUrl}/shows`);
  }

  addShow(show: Show): Observable<Show> {
    return this._http.post<Show>(`${this.apiServerUrl}/admin/show`, show);
  }
}
