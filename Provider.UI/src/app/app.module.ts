import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent }  from './app.component';
import { AuthGuard } from './auth.guard';
import { UserService } from './services/user.service';
import { ProviderComponent }  from './components/provider/provider.component';
import { ProviderService } from './services/provider.service';
import { PagerService } from './services/pagerservice';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { appRouterModule } from './app.routes';

@NgModule({
  imports: [     
      BrowserModule,
      HttpModule,
      FormsModule,
      appRouterModule
  ],
  declarations: [
      AppComponent,
      ProviderComponent,
    LoginPageComponent,
  ],
  providers: [
      ProviderService,
      PagerService,
      AuthGuard,
      UserService
  ],
  bootstrap: [
      AppComponent
  ]
})
export class AppModule { }
