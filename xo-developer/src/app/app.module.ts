import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegComponent } from './reg/reg.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

import { AuthService } from "./auth.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { LayoutComponent } from './layout/layout.component';
import {TokenInterceptor} from "./shared/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    DashboardComponent,
    RegComponent,
    HomeComponent,
    FooterComponent,
    PortfolioComponent,
    LayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ AuthService, {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  } ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
