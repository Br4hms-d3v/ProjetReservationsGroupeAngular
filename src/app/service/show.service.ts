import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Show} from "../model/ShowModel";

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private apiServerUrl = 'http://localhost:8080/api'

  constructor(private _hpp: HttpClient) { }

  getAllShows() {
    return this._hpp.get<Show[]>(`${this.apiServerUrl}/shows`)
  }
}
