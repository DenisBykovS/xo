import {Component, OnInit} from '@angular/core';
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'xo-developer';
  constructor(private authService: AuthService) {
  }

  ngOnInit(){
    const pToken = localStorage.getItem('token')
    if (pToken !== null) {
      this.authService.setToken(pToken)
    }
  }
}
