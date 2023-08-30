import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  providers: [
  ],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
  ],

  declarations: [

  ],
  exports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  entryComponents: [

  ],
  schemas: []
})

export class SharedModule { }