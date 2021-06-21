import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth';
import { NavItem } from '../../models';
import { MENU } from '../../ui';
@Component({
  selector: 'app-nar-bar-features',
  templateUrl: './nar-bar-features.component.html',
  styleUrls: ['./nar-bar-features.component.scss'],
})
export class NarBarFeaturesComponent implements OnInit, OnDestroy {
  subscription$: Subscription;
  menus: NavItem[] = MENU;
  isCollapsed = true;
  fullname: string;
  roles = ['ANONYMOUS'];
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.subscription$ = this.auth.isLoggedIn().subscribe((logined) => {
      if (logined) {
        this.fullname = this.auth.getFullName();
        this.roles = this.auth.getUserRoles().split(',');
      }
    });
  }
  signOut() {
    this.auth.logout();
    this.fullname = undefined;
  }
  hasPermision(roles): boolean {
    return !this.roles.some((rol) => roles.indexOf(rol) === -1);
  }
  ngOnDestroy(): void {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }
}
