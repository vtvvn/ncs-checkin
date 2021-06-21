import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HealthDeclaration } from '../models';
@Injectable({
  providedIn: 'root',
})
export class DeclarationService {
  private apiUrl = environment.API_ENDPOINT; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getDeclaration(id: string): Observable<HealthDeclaration> {
    return this.http.get<HealthDeclaration>(
      this.apiUrl + '/healthdeclaration/' + id
    );
  }
  getDeclarations(): Observable<HealthDeclaration[]> {
    return this.http
      .get<HealthDeclaration[]>(this.apiUrl)
      .pipe(catchError(this.handleError<HealthDeclaration[]>('getall', [])));
  }
  getDecsByPartyId(partyId: string): Observable<HealthDeclaration[]> {
    return this.http.get<HealthDeclaration[]>(
      `${this.apiUrl}/healthdeclarations/?partyid=${partyId}`
    );
  }
  getDecsByPartyCode(partyCode: string): Observable<HealthDeclaration[]> {
    return this.http.get<HealthDeclaration[]>(
      `${this.apiUrl}/healthdeclarations/?partycode=${partyCode}`
    );
  }
  getDecsByUserId(userId: string): Observable<HealthDeclaration[]> {
    return this.http.get<HealthDeclaration[]>(
      `${this.apiUrl}/healthdeclarations/?userid=${userId}`
    );
  }
  addDeclaration(dec: HealthDeclaration): Observable<HealthDeclaration> {
    return this.http
      .post<HealthDeclaration>(
        this.apiUrl + '/healthdeclaration/',
        dec,
        this.httpOptions
      )
      .pipe(catchError(this.handleError<HealthDeclaration>('addHero')));
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
