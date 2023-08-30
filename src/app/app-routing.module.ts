import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const crudModule = () => import('./features/crud/crud.module').then(crud => crud.CrudModule);
const homeModule = () => import('./features/home/home.module').then(crud => crud.HomeModule);

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', loadChildren: homeModule},
  {path: 'crud', loadChildren: crudModule}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
