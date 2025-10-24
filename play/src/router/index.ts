import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

// 扩展路由元数据类型
declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    icon?: string;
    hideInMenu?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('~/views/Login.vue'),
    meta: {
      title: '登录',
      hideInMenu: true,
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('~/views/Home.vue'),
    redirect: '/dashboard',
    meta: {
      title: '首页',
      icon: 'HomeFilled',
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('~/views/Dashboard.vue'),
        meta: {
          title: '仪表盘',
          icon: 'HomeFilled',
        },
      },
      {
        path: '/basic',
        name: 'basic',
        redirect: '/basic/button-example',
        meta: {
          title: '基础示例',
          icon: 'Menu',
        },
        children: [
          {
            path: '/basic/button-example',
            name: 'BasicButtonExample',
            component: () => import('~/views/basic/ButtonExample.vue'),
            meta: {
              title: '按钮示例',
              icon: 'Money',
            },
          },
          {
            path: '/basic/table-example',
            name: 'BasicTableExample',
            component: () => import('~/views/basic/TableExample.vue'),
            meta: {
              title: '表格示例',
              icon: 'Money',
            },
          },
          {
            path: '/basic/form-example',
            name: 'BasicFormExample',
            component: () => import('~/views/basic/FormExample.vue'),
            meta: {
              title: '表单示例',
              icon: 'Money',
            },
          },
          {
            path: '/basic/dialog-example',
            name: 'BasicDialogExample',
            component: () => import('~/views/basic/DialogExample.vue'),
            meta: {
              title: '对话框示例',
              icon: 'Money',
            },
          },
          {
            path: '/basic/search-example',
            name: 'BasicSearchExample',
            component: () => import('~/views/basic/SearchExample.vue'),
            meta: {
              title: '搜索示例',
              icon: 'Money',
            },
          },
          {
            path: '/basic/descriptions-example',
            name: 'BasicDescriptionsExample',
            component: () => import('~/views/basic/DescriptionsExample.vue'),
            meta: {
              title: '描述列表示例',
              icon: 'Money',
            },
          },
        ],
      },
      {
        path: '/practice',
        name: 'practice',
        redirect: '/practice/list-example',
        meta: {
          title: '实战示例',
          icon: 'Menu',
        },
        children: [
          {
            path: '/practice/list-example',
            name: 'PracticeListExample',
            component: () => import('~/views/practice/ListExample.vue'),
            meta: {
              title: '列表示例',
              icon: 'Money',
            },
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
