import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AdminService} from "../admin.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  minLength = 6
  form: FormGroup

  constructor(private router: Router, private adminService: AdminService ) { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.minLength)])
    })
  }

  userIn() {
    const admin = {...this.form.value}
    this.adminService.authUser(admin).subscribe(() => {
      this.router.navigate(['/admin', 'dashboard'])
    })
  }
}
