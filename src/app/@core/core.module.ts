import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { Interceptor } from "./interceptors/interceptor";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./layouts/main-layout/main-layout.component";
import { HeaderLayoutComponent } from "./layouts/header-layout/header-layout.component";
import { FooterLayoutComponent } from "./layouts/footer-layout/footer-layout.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const components = [ 
  FooterLayoutComponent,
  HeaderLayoutComponent,
  MainLayoutComponent
];

@NgModule({
  imports: [
    RouterModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
  ],
  declarations: [...components],
  exports: [MainLayoutComponent],
  entryComponents: [

  ],
  schemas: []
})

export class CoreModule { }