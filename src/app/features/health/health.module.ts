import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeclarationComponent } from './components/declaration/declaration.component';
import { RouterModule, Routes } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { DeclarationResultComponent } from './components/declaration-result/declaration-result.component';
import { QRCodeModule } from 'angularx-qrcode';
import { DeclarationListComponent } from './components/declaration-list/declaration-list.component';
import { AuthGuard } from 'src/app/core/auth';
const routes: Routes = [
  {
    path: 'declaration',
    component: DeclarationComponent,
  },
  {
    path: 'view-declaration',
    canActivate: [AuthGuard],
    component: DeclarationListComponent,
  },
  { path: 'result', component: DeclarationResultComponent },
];

@NgModule({
  declarations: [
    DeclarationComponent,
    DeclarationResultComponent,
    DeclarationListComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    QRCodeModule,
    TabsModule.forRoot(),
    RouterModule.forChild(routes),
  ],
})
export class HealthModule {}
