import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElectronicListComponent } from './electronic-list/electronic-list.component';
import { ElectronicDetailComponent } from './electronic-list/electronic-detail/electronic-detail.component';

const routes: Routes = [
//  {path: 'electronics', component: ElectronicListComponent},
//  {path: 'electronics/:index', component: ElectronicDetailComponent},
  {path: '', component: ElectronicListComponent},
  {path: ':index', component: ElectronicDetailComponent},

];

@NgModule({
  // forChild -> é usado para subrotas. forRoot deve ser usado apenas no arquvo de rotas principal
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElectronicsRoutingModule { }
