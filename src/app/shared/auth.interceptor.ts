import { HttpInterceptor } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req, next) {
    const authService = this.injector.get(AuthService);
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: "Bearer ${authService.getToken1()}"
      }
    });
    return next.handle(tokenizeReq);
  }
}
