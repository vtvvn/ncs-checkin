import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth';
import { FeaturesComponent } from './shared/components/features/features.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: '',
    component: FeaturesComponent, // Angular se load component nay truoc khi load cac module children
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./features/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'health',
        loadChildren: () =>
          import('./features/health/health.module').then((m) => m.HealthModule),
      },
      {
        path: 'news',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/news/news.module').then((m) => m.NewsModule),
        data: { roles: ['ADMIN'] },
      },
      {
        path: 'token',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/token/token.module').then((m) => m.TokenModule),
      },
      {
        path: 'checkin',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/checkin/checkin.module').then(
            (m) => m.CheckinModule
          ),
        data: { roles: ['ADMIN'] },
      },
      {
        path: '**',
        redirectTo: '/sub-route/first',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
