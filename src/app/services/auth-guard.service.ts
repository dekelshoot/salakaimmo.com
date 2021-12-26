import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, RouterStateSnapshot,  ActivatedRouteSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router : Router,
              private authService : AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | Promise<boolean> | boolean{
    if(this.authService.isAuth){
      return true
    }else{
      this.router.navigate(["/auth/signin"])
      return false
    }
  }
}
