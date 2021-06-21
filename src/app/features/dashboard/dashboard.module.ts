import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckinModule } from '../checkin/checkin.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { CaseByCountryComponent } from './charts/case-by-country/case-by-country.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { NewsModule } from '../news/news.module';

export const routes = [
  {
    path: '',
    component: DashboardComponent,
    pathMatch: 'full',
    data: {
      breadcrumb: 'Dashboard'
    }
  }
];

@NgModule({
  declarations: [
    DashboardComponent, CaseByCountryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NewsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    RouterModule.forChild(routes),
  ]
})
export class DashboardModule { }
