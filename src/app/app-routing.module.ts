import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {routes} from './routes';
//const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
