import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultantComponent } from './consultant/consultant.component';
import { StartupComponent } from './startup/startup.component';

const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "consultants", component: ConsultantComponent },
    { path: "startup", component: StartupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
