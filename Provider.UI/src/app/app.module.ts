import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { ProviderComponent }  from './provider.component';
import { ProviderService } from './provider.service';
import { PagerService } from './pagerservice';


@NgModule({
  imports: [     
      BrowserModule,
      HttpModule,
      FormsModule,
  ],
  declarations: [
      AppComponent,
      ProviderComponent
  ],
  providers: [
      ProviderService,
      PagerService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
