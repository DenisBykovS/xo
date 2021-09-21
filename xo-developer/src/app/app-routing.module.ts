import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AuthComponent } from "./auth/auth.component";
import { RegComponent } from "./reg/reg.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "./shared/auth.guard";
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "/", pathMatch: "full" },
      { path: "", component: HomeComponent },
      { path: "auth", component: AuthComponent },
      { path: "reg", component: RegComponent },
      { path: "portfolio", component: PortfolioComponent },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: "admin", loadChildren: "./admin/admin.module#AdminModule" },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
