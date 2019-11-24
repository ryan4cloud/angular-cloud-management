import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NzMessageService } from "ng-zorro-antd/message";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private message: NzMessageService,
    private cookie: CookieService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.cookie.get('x-auth-token')) {
      return true;
    }
    this.message.warning('请登录后再访问！');
    this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url }});
    return false;
  }

}
