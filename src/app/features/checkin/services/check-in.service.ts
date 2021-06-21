import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CheckIn } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CheckInService {
  private apiUrl = environment.API_ENDPOINT; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  getCheckIn(id: string): Observable<CheckIn> {
    return this.http.get<CheckIn>(this.apiUrl + '/checkin/' + id);
  }
  getCheckIns(): Observable<CheckIn[]> {
    return this.http
      .get<CheckIn[]>(this.apiUrl+ '/checkins/')
      .pipe(catchError(this.handleError<CheckIn[]>('getall', [])));
  }
  addCheckIn(checkIn: CheckIn): Observable<CheckIn>{
    return this.http
      .post<CheckIn>(this.apiUrl+ '/checkin/', checkIn, this.httpOptions)
      .pipe(
        catchError(this.handleError<CheckIn>('addHero'))
      );
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
