import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavItem } from '../../models';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent implements OnInit {
  expanded: boolean = false;

  @Input() item: NavItem;
  @Input() depth: number;
  constructor(public router: Router) {
    if (this.depth === undefined) {
      this.depth = 0;
  }
  }

  ngOnInit(): void {}
  onItemSelected(item: NavItem) {
    if (!item.children || !item.children.length) {
      if (item.route) {
        this.router.navigate([item.route]);
      } else {
        this.handleSpecial(item);
      }
    }

    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
  handleSpecial(item: NavItem) {
    if (item.displayName == 'Sign Out') {
      this.handleSignOut();
    }
  }
  handleSignOut() {
    
  }
}
