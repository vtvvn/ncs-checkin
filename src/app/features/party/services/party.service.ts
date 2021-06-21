import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Party } from '../models';
@Injectable({
  providedIn: 'root',
})
export class PartyService {
  private apiUrl = environment.API_ENDPOINT + '/parties/'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getParty(id: string): Observable<Party> {
    return this.http.get<Party>(this.apiUrl + '/' + id);
  }
  getParties(): Observable<Party[]> {
    return this.http
      .get<Party[]>(this.apiUrl)
      .pipe(catchError(this.handleError<Party[]>('getall', [])));
  }
  searchPartyByCode(term: string): Observable<Party[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<Party[]>(`${this.apiUrl}?code=${term}`)
      .pipe(catchError(this.handleError<Party[]>('searchPartyByCode')));
  }
  /* GET heroes whose name contains search term */
  searchPartiesByName(term: string): Observable<Party[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<Party[]>(`${this.apiUrl}?name=${term}`)
      .pipe(catchError(this.handleError<Party[]>('searchPartiesByName', [])));
  }
  addParty(party: Party): Observable<Party> {
    return this.http
      .post<Party>(this.apiUrl, party, this.httpOptions)
      .pipe(catchError(this.handleError<Party>('addHero')));
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
