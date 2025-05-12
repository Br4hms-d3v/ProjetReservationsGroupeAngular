import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Show} from "../model/ShowModel";
import {catchError, Observable, throwError} from 'rxjs';
import {ShowByIdModel} from '../model/ShowByIdModel';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  private apiServerUrl = 'http://localhost:8080/api'

  constructor(private _http: HttpClient) {
  }

  getAllShows() {
    return this._http.get<Show[]>(`${this.apiServerUrl}/shows`);
  }

  addShow(show: Show): Observable<Show> {
    return this._http.post<Show>(`${this.apiServerUrl}/admin/show`, show);
  }

  getShow(id: number) {
    return this._http.get<ShowByIdModel>(`${this.apiServerUrl}/show/${id}`)
      .pipe(catchError(this.notFoundById));
  }

  updateShow(id: number, show: Show) {
    return this._http.put<Show>(`${this.apiServerUrl}/admin/show/${id}`, show);
  }

  private notFoundById(error: HttpErrorResponse) {
    if (error.status === 404) {
      return throwError(() => new Error('Spectacle non trouvé'));
    } else {
      return throwError(() => new Error('Une erreur s\'est produit. Veuillez réessayer plus tard'));
    }
  }
}

