import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { News, NewsRss } from '../models';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class NewsService {
  news: News;
  private apiUrl = environment.API_ENDPOINT ; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}

  getNews(): Observable<News[]> {
    return this.http
      .get<News[]>(this.apiUrl + '/news/')
      .pipe(
        catchError(this.handleError<News[]>('getNews'))
      );
  }
  getNewsContent(id): Observable<News> {
    return this.http
      .get<News>(this.apiUrl + '/news/' + id)
      .pipe(
        catchError(this.handleError<News>('getNewsContent'))
      );
  }
  addNews(news: News): Observable<News> {
    return this.http
      .post<News>(this.apiUrl + '/news/', news, this.httpOptions)
      .pipe(
        catchError(this.handleError<News>('addNews'))
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

