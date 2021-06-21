import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  private authService: AuthService;
  constructor(private injector: Injector) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token: string = this.authService.getToken();
    const userId: string = this.authService.getUserId();
    if (
      req.method.toLowerCase() === 'post' ||
      req.method.toLowerCase() === 'put'
    ) {
      if (req.body instanceof FormData) {
        req = req.clone({
          body: req.body.append('userLoginId', userId),
        });
      } else {
        const foo = {};
        foo['userLoginId'] = userId;
        req = req.clone({
          // Spread Operator
          body: { ...req.body, ...foo },
        });
      }
    }
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
    // const reqCloned =  this.handleBodyIn(req, token, 'userLoginId');
    // const copiedReq = reqCloned;
    // return next.handle(copiedReq);
  }
  handleBodyIn(req: HttpRequest<any>, tokenToAdd, tokenName): HttpRequest<any> {
    if (
      req.method.toLowerCase() === 'post' ||
      req.method.toLowerCase() === 'put'
    ) {
      if (req.body instanceof FormData) {
        req = req.clone({
          body: req.body.append(tokenName, tokenToAdd),
        });
      } else {
        const foo = {};
        foo[tokenName] = tokenToAdd;
        req = req.clone({
          body: { ...req.body, ...foo },
        });
      }
    }
    if (req.method.toLowerCase() === 'get') {
      // req = req.clone({
      //   params: req.params.set(tokenName, tokenToAdd),
      // });
      req = req.clone();
    }
    return req;
  }
}
