import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CoreService } from '../core/core.service';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _coreService: CoreService,
    private service: AuthService,
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.service.IsLoggedIn()) {
      if (route.url.length > 0) {
        let menu = route.url[0].path;
        if (menu === 'user') {
          if(this.service.GetUserrole()=='admin'){
            return true;

          }else{
            this._coreService.openSnackBar('You Dont Have Access','','');
            this.router.navigate(['']);
            return false;

          }

        } else {
          return true;

        }

      } else {
        return true;

      }
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

}
