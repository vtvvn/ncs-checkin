import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { CommonUtil } from 'src/app/shared/util';
@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const commonUtil = new CommonUtil();
    return next.handle(req).pipe(
      filter((event) => event instanceof HttpResponse),
      map((event: HttpResponse<any>) => {
        let newBody = event.body;
        if (
          JSON.stringify(newBody).includes('{"arrayrecord":[{"jsons":{"items"')
        ) {
          newBody = newBody.arrayrecord[0].jsons.items;
        } else if (JSON.stringify(newBody).includes('"arrayrecord"')) {
          newBody = newBody.arrayrecord;
        } else if (JSON.stringify(newBody).includes('"onerecord":[{"jsons"')) {
          newBody = newBody.onerecord[0].jsons;
        } else if (JSON.stringify(newBody).includes('"onerecord"')) {
          newBody = newBody.onerecord[0];
        }
        newBody = commonUtil.keysToCamel(newBody);
        return event.clone({
          body: newBody,
        });
      })
      // Xuong mau: chi vi kiem tra && event.body.items nhu ben duoi
      // ma trong body khong co items day den loi
      // map((event: HttpResponse<any>) => {
      //   if (event instanceof HttpResponse && event.body.items) {
      //     const newBody = commonUtil.keysToCamel(event.body.items);
      //     const modEvent = event.clone({ body: newBody });
      //     console.log(modEvent);
      //     return modEvent;
      //   }
      // })
    );
  }
}
