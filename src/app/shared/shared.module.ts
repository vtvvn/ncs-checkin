import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { FeaturesComponent } from './components/features/features.component';
import { NarBarFeaturesComponent } from './components/nar-bar-features/nar-bar-features.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';

@NgModule({
  declarations: [
    NavBarComponent,
    FeaturesComponent,
    NarBarFeaturesComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgSelectModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgSelectModule,
    NavBarComponent]
})
export class SharedModule { }
