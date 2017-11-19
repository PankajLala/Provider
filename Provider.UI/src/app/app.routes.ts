import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ProviderComponent } from './components/provider/provider.component';

// Route config let's you map routes to components
const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'provider',
    component: ProviderComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

export const appRouterModule = RouterModule.forRoot(routes);
