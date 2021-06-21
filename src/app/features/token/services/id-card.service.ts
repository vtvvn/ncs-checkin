import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IdCard } from '../models';
@Injectable({
  providedIn: 'root',
})
export class IdCardService {
  private apiUrl = environment.API_ENDPOINT +'/token'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getIdCard(id: string): Observable<IdCard> {
    return this.http.get<IdCard>(this.apiUrl + '/' + id);
  }
  getIdCards(): Observable<IdCard[]> {
    return this.http
      .get<IdCard[]>(this.apiUrl)
      .pipe(catchError(this.handleError<IdCard[]>('getall', [])));
  }
  getIdCardsByUserName(username: string): Observable<IdCard[]> {
    return this.http
      .get<IdCard[]>(this.apiUrl + '/?username=' + username)
      .pipe(catchError(this.handleError<IdCard[]>('getIdCardsByUserName', [])));
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
