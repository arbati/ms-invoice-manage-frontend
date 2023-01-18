import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },
  {
    title: 'MAIN',
    group: true,
  },
  {
    title: 'Customers',
    icon: 'person-outline',
    children: [
      {
        title: 'list',
        link: '/pages/customers/list',
      }]
  },
  {
    title: 'Product',
    icon: 'shopping-bag-outline',
    children: [
      {
        title: 'list',
        link: '/pages/products/list',
      }]
  },
  {
    title: 'Invoice',
    icon: 'layout-outline',
    children: [
      {
        title: 'list',
        link: '/pages/invoice/list',
      }]
  },
  {
    title: 'Tools',
    icon: 'settings',
    children: [
      {
        title: 'list',
        link: '/pages/tools/list',
      }]
  },








  {
    title: 'Auth',
    icon: 'lock-outline',
    children: [
      {
        title: 'Login',
        link: '/auth/login',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
      },
    ],
  },
];
