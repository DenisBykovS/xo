import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { MessagePageComponent } from './message-page/message-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminGuard} from "./admin.guard";

@NgModule({
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    MessagePageComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([
      {path : '', component : AdminLayoutComponent, children : [
          {path : '', redirectTo : '/admin/login', pathMatch : 'full'},
          {path: 'login', component : LoginPageComponent},
          {path: 'create',canActivate: [AdminGuard], component : CreatePageComponent},
          {path: 'dashboard',canActivate: [AdminGuard], component : DashboardPageComponent},
          {path: 'edit/:id',canActivate: [AdminGuard], component : EditPageComponent},
          {path: 'message',canActivate: [AdminGuard], component : MessagePageComponent}
        ]
      }
    ])
  ],
  exports: [],
  providers: [AdminGuard]
})

export class AdminModule {}
