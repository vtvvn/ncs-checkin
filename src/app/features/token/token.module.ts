import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QRCodeModule } from 'angularx-qrcode';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { IdCardComponent } from './components/id-card/id-card.component';
import { NgxBarcodeModule } from 'ngx-barcode';
const routes: Routes = [
  {
    path: '',
    component: IdCardComponent,
  },
];

@NgModule({
  declarations: [IdCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    QRCodeModule,
    NgxBarcodeModule,
    RouterModule.forChild(routes),
  ],
})
export class TokenModule {}
