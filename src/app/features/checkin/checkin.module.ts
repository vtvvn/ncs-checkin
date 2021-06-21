import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckinComponent } from './components/checkin/checkin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxEchartsModule } from 'ngx-echarts';
import { CheckinResponseComponent } from './components/checkin-response/checkin-response.component';
import { CheckinByDateComponent } from './charts/checkin-by-date/checkin-by-date.component';

const routes: Routes = [
  {
    path: 'checkin',
    component: CheckinComponent,
  },
  {
    path: 'view-checkin-by-date',
    component: CheckinByDateComponent
  },
];

@NgModule({
  declarations: [
    CheckinComponent,
    CheckinResponseComponent,
    CheckinByDateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    QRCodeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    RouterModule.forChild(routes),
  ],
  exports: [CheckinByDateComponent]
})
export class CheckinModule {}
