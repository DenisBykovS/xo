import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {tap} from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {User} from "./shared/interfaces";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private token: null;
  isAuth = localStorage.getItem('user') ? true : false

  constructor(private http: HttpClient) {}

  regUser(user: User): Observable<User> {
    return this.http.post<User>(`/api/auth/register`, user)
      // .pipe(tap(() => {this.isAuth = true}))
  }

  authUser(user: User ): Observable<{token: string, user: string}> {
    return this.http.post<{token: string, user: string}>(`/api/auth/login`, user)
      .pipe(
        tap(({token, user}) => {
          localStorage.setItem("token", token);
          localStorage.setItem("user", user);
          this.setToken(token)
          this.isAuth = true
        })
      )
  }

  setToken(token) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.setItem("token", '');
    localStorage.setItem("user", '');
    this.isAuth = false
  }
}
