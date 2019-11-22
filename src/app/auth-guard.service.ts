import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  constructor(
    private router: Router
  ) { }

  checkLogin(url: string): boolean {
    const token = window.sessionStorage.getItem('x-auth-token');
    if (token == null || token == '' || token == 'undefined') {
      console.log('token is null or undefined');
      localStorage.setItem('redirectUrl', url);
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }

}
