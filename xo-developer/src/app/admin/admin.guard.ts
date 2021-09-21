import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import {Observable} from "rxjs";
import {AdminService} from "./admin.service";


@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private authService: AdminService, private router: Router) {
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('admin')) {
      return true
    } else {
      this.authService.logout();
      this.router.navigate(['admin']);
    }
  }

}
