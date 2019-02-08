import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { StartupComponent } from './startup/startup.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "404", component: Page404Component },
    { path: "consultants", component: ConsultantComponent },
    { path: "startup", component: StartupComponent },
    { path: "**", redirectTo: "/404" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
