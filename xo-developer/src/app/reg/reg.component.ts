import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../shared/interfaces";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss']
})
export class RegComponent implements OnInit, OnDestroy {

  form: FormGroup
  sub: Subscription
  minLength = 10

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.minLength)])
    })
  }

  ngOnDestroy(){
    if (this.sub) {
      this.sub.unsubscribe()
    }
  }

  addUser() {
    const formUser: User = {...this.form.value}
    this.sub = this.authService.regUser(formUser).subscribe((data) => {
      if(data) {
        this.router.navigate(['/auth'], {
          queryParams: {
            registered: true
          }
        })
      } else {
        this.router.navigate(['/reg'])
      }
    })
    this.form.reset()
  }

}
