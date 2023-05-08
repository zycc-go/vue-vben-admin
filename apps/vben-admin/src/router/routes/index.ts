import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '@/layouts/index';

/** 动态路由 */
const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: BasicLayout,
    redirect: { name: 'Analysis' },
    children: [
      {
        path: '',
        name: 'Analysis',
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
];

/** 静态路由列表，访问这些页面可以不需要权限 */
const staticRoutes: RouteRecordRaw[] = [
  ...dynamicRoutes,
  // {
  //   path: '/:catchAll(.*)',
  //   redirect: { name: 'Dashboard' },
  // },
  // 根路由
  {
    path: '/',
    name: 'Root',
    redirect: '/dashboard',
    meta: {
      title: 'Root',
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: 'Login',
    },
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: () => import('@vben/share-ui').then((m) => m.Redirect),
    meta: {
      title: 'Redirect',
    },
  },
  {
    path: '/:path(.*)*',
    name: 'PageNotFound',
    component: () => import('@vben/share-ui').then((m) => m.NotFound),
    meta: {
      title: 'PageNotFound',
    },
  },
];

/** 排除在主框架外的路由，这些路由没有菜单和顶部及其他框架内容 */
const externalRoutes: RouteRecordRaw[] = [];

export { dynamicRoutes, externalRoutes, staticRoutes };
