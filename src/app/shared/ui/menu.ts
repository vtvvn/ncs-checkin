import { NavItem } from "../models/nav-item.model";

export let MENU: NavItem[] = [
  {
    displayName: 'Tờ khai y tế',
    iconName: 'list',
    route: 'health/declaration',
    roles: ['ANONYMOUS','USER','ADMIN']
  },
  {
    displayName: 'Xem tờ khai',
    iconName: 'add_box',
    route: 'health/view-declaration',
    roles: ['ANONYMOUS','USER','ADMIN']
  },
  {
    displayName: 'My Id Card',
    iconName: 'markunread_mailbox',
    route: 'token',
    roles: ['USER','ADMIN']
  },
  {
    displayName: 'Check In',
    iconName: '',
    route: 'checkin/checkin',
    roles: ['ADMIN']
  },
  {
    displayName: 'View Check In',
    iconName: '',
    route: 'checkin/view-checkin-by-date',
    roles: ['ADMIN']
  },
  {
    displayName: 'Cập nhật tin',
    iconName: '',
    route: 'news/update-news',
    roles: ['ADMIN']
  }
];