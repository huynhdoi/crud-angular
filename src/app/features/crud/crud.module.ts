import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudRoutingModule } from './crud-routing.module';
import { CrudComponent } from './crud.component';
import { DetailComponent } from './detail/detail.component';
import { SharedModule } from 'src/app/@share/shared.module';

@NgModule({
  declarations: [
    CrudComponent,
    DetailComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    CrudRoutingModule,
  ]
})
export class CrudModule { }
