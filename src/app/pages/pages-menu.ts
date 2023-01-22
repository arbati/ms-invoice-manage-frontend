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
        title: 'Customers List',
        icon:'people-outline',
        link: '/pages/customers/list',
      },
      {
        title:'Add Customer',
        icon:'plus-outline',
        link: '/pages/customers/add',
      }
    ]
  },
  {
    title: 'Product',
    icon: 'shopping-bag-outline',
    children: [
      {
        title: 'Products List',
        icon:'shopping-cart-outline',
        link: '/pages/products/list',
      },
      {
        title:'Add Product',
        icon:'plus-outline',
        link: '/pages/products/add',
      }
    ]
  },
  {
    title: 'Invoice',
    icon: 'layout-outline',
    children: [
      {
        title: 'Invoice List',
        link: '/pages/invoice/list',
      },
      {
        title: 'Add Invoice',
        link: '/pages/invoice/add',
      }
    ]
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
