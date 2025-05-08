import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

export class AuthInterceptor implements HttpInterceptor {
  authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lsValue = localStorage.getItem(this.authLocalStorageToken)
    if (!lsValue) {
      return next.handle(req)
    }
    const parsedUser = JSON.parse(lsValue)

    if (parsedUser) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${parsedUser.token}`}
      })
    }
    return next.handle(req)
  }
}
