import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, take, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthenticationService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) : 
  boolean 
  | UrlTree 
  | Promise<boolean | UrlTree> 
  | Observable<boolean | UrlTree>  {
   
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if(isAuth) {
          return true;
        }
        return this.router.createUrlTree(['auth']);
      })
    );

  }
}
