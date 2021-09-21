import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit, OnDestroy {

  sub: Subscription
  form: FormGroup;
  minlength = 10

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(this.minlength),
      ]),
    });

    // this.route.queryParams.subscribe((params: Params) => {
    //   if(params['registered']) {
    //
    //   } else if(params['accessDenied']) {
    //
    //   }
    // })
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe()
    }
  }

  userIn() {
    const user = { ...this.form.value };

    this.sub = this.authService.authUser(user).subscribe((data) => {
      if (!data) {
        this.router.navigate(["/auth"]);
      } else {
        this.router.navigate(["/dashboard"]);
      }
    });
    this.form.reset();
  }
}
