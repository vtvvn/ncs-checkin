import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UserLogin } from '../models';
import { DateHelper } from '../services';

/*
Why create a separate Authentication service?
Putting all our client authentication logic in a centralized application-wide singleton AuthService 
will help us keep our code organized.

This way, if for example later we need to change security providers or refactor our security logic, 
we only have to change this class.

Inside this service, we will either use some Javascript API for calling a third-party service, 
or the Angular HTTP Client directly for doing an HTTP POST call.

In both cases, the goal is the same: to get the user and password combination across the network 
to the Authentication server via a POST request, 
so that the password can be validated and the session initiated.
*/
@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = environment.API_ENDPOINT + '/authenticate/';
  private loggedIn = new BehaviorSubject<boolean>(false);
  constructor(
    private http: HttpClient,
    private router: Router,
    private dateHelper: DateHelper
  ) {}

  login(u: string, p: string): Observable<UserLogin> {
    const body = { username: u, password: p };
    return this.http.post<UserLogin>(this.url, body).pipe(
      tap((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.setSession(user);
        this.loggedIn.next(true);
      }),
      // We are calling shareReplay to prevent the receiver of this Observable from
      // accidentally triggering multiple POST requests due to multiple subscriptions.
      shareReplay()
    );
  }

  private setSession(user) {
    localStorage.setItem('CHECKIN_USER_ID', user.userId);
    localStorage.setItem('CHECKIN_FULL_NAME', user.fullName);
    localStorage.setItem('CHECKIN_USER_ROLES', user.roles);
    localStorage.setItem('CHECKIN_EXPIRES_AT', user.expiresAt);
    // const currentDate = new Date();
    // const expiresIn = 24 * 60 * 60;
    // const expiresAt = this.dateHelper.add('second', expiresIn, currentDate);
    // const token = {
    //   id: user.username,
    //   issuer: 'NCS JSC',
    //   issueFor: user.fullName,
    //   issueDate: currentDate,
    //   fromDate: currentDate,
    //   toDate: expiresAt,
    //   expiresIn: expiresIn,
    //   description: '',
    // };
    // save token:
    localStorage.setItem('CHECKIN_TOKEN', user.token);
    localStorage.setItem(
      'CHECKIN_ID_CARD',
      JSON.stringify({
        id: user.userName,
        issueFor: user.fullName,
        issueForCode: user.partyCode,
        issuer: 'Noi Bai Catering Services',
        fromDate: new Date(),
        toDate: user.expiresAt,
      })
    );

    // this.http.post<Token>(this.url + '/token', token).pipe().subscribe();
  }
  isLoggedIn(): Observable<boolean> {
    const token = localStorage.getItem('CHECKIN_TOKEN');
    if (!token) {
      this.loggedIn.next(null);
    } else {
      const currentDate = new Date();
      const expiresAt = new Date(localStorage.getItem('CHECKIN_EXPIRES_AT'));
      const isExpired =
        this.dateHelper.diff('second', currentDate, expiresAt) <= 0;
      if (isExpired) {
        this.loggedIn.next(null);
      } else {
        this.loggedIn.next(true);
      }
    }
    return this.loggedIn.asObservable();
  }

  getToken(): string {
    return localStorage.getItem('CHECKIN_TOKEN');
  }
  getUserId(): string {
    return localStorage.getItem('CHECKIN_USER_ID');
  }
  getUserRoles(): string {
    return localStorage.getItem('CHECKIN_USER_ROLES');
  }
  getFullName(): string {
    return localStorage.getItem('CHECKIN_FULL_NAME');
  }
  hasPermission() {
    return false;
  }
  logout() {
    localStorage.removeItem('CHECKIN_USER_ID');
    localStorage.removeItem('CHECKIN_USER_ROLES');
    localStorage.removeItem('CHECKIN_FULL_NAME');
    localStorage.removeItem('CHECKIN_TOKEN');
    localStorage.removeItem('CHECKIN_ID_CARD');
    localStorage.removeItem('CHECKIN_EXPIRES_AT');
    this.loggedIn.next(null);
    this.router.navigate(['/']);
  }
}
