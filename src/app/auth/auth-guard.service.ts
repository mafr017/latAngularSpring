import { Injectable } from '@angular/core';
import { CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
 } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
  Observable<boolean> | Promise<boolean> | boolean {
    
    return this.authService.isAuthenticated()
    .then((authenticated) => {
      if (authenticated == "true") {
        return true;
      } else {
        console.log("Access Denied...");
        this.router.navigate(['/']);
        return false;
      }
    });
    
  }

}
