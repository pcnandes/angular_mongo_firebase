import { MyFirstComponent } from './myfirst.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  // indica as classes que serão usadas pelo modulo
  declarations: [
    AppComponent,
    MyFirstComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  // indica o component que será carregado por esse modulo
  bootstrap: [AppComponent]
})
export class AppModule { }
