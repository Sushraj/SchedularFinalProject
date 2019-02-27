import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router/src/utils/preactivation";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;
  constructor(private authService: AuthService) {}

  /**
   * @description this function used for AuthGuard
   * @param  {ActivatedRouteSnapshot} route
   * @param  {RouterStateSnapshot} state
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuthenticated();
  }
}
