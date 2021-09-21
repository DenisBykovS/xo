import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {tap} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import {Admin} from "../shared/interfaces";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isAuth = localStorage.getItem('admin') ? true : false

  constructor(private http: HttpClient) {}

  authUser(admin: Admin ): Observable<{token: string, user: string}> {
    return this.http.post<{token: string, user: string}>(`/api/admin/login`, admin)
      .pipe(
        tap(({token, user}) => {
          localStorage.setItem("tokenAdmin", token);
          localStorage.setItem("admin", user);
          this.isAuth = true
        })
      )
  }

  logout() {
    localStorage.setItem("tokenAdmin", '');
    localStorage.setItem("admin", '');
    this.isAuth = false
  }
}
