import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {PanelComponent} from './panel/panel.component'
import {HowitworksComponent} from './howitworks/howitworks.component'

const routes: Routes = [
  {
    path:'', component: PanelComponent
  },
  {
    path:'how-it-works', component: HowitworksComponent
  },
  
  {path:'**', redirectTo:'/', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
