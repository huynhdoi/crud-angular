import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudComponent } from './crud.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: CrudComponent,
    pathMatch: 'full',
    canDeactivate: [],
    canActivate: []
  },
  {
    path: 'add',
    component: DetailComponent,
    data: {
      breadcrumbs: [
        { display: 'add', url: 'crud' }
      ],
    },
    canDeactivate: [],
    canActivate: []
  },
  {
    path: 'edit/:id',
    component: DetailComponent,
    data: {
      breadcrumbs: [
        { display: 'edit', url: 'crud' }
      ]
    },
    canDeactivate: [],
    canActivate: []
  },
  {
    path: 'view/:id',
    component: DetailComponent,
    data: {
      breadcrumbs: [
        { display: 'view', url: 'crud' }
      ]
    },
    canDeactivate: [],
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrudRoutingModule { }
