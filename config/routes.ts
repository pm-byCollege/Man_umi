/*
 * @Descripttion:
 * @version: 1.0
 * @Author:
 * @Date: 2021-10-08 15:46:24
 * @LastEditors: YingJie Xing
 * @LastEditTime: 2021-10-09 10:26:14
 */
export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/welcome',
                name: '欢迎',
                icon: 'smile',
                component: './Welcome',
              },
              // {
              //   name: 'dashboardworkplace',
              //   icon: 'table',
              //   path: '/dashboardworkplace',
              //   component: './DashboardWorkplace',
              // },
              {
                path: '/',
                redirect: '/welcome',
              },
              {
                path: '/todo',
                name: '待办事项',
                icon: 'UnorderedListOutlined',
                component: './Todo',
                authority: ['user'],
              },
              // {
              //   path: '/person',
              //   name: 'person',
              //   icon: 'UserOutlined',
              //   component: './Person',
              // },
              {
                path: '/studentList',
                name: '学生信息',
                icon: 'smile',
                component: './StudentList',
                authority: ['admin'],
              },
              // {
              //   path: '/admin',
              //   name: 'admin',
              //   icon: 'crown',
              //   component: './Admin',
              //   authority: ['admin'],
              //   routes: [
              //     {
              //       path: '/admin/sub-page',
              //       name: 'sub-page',
              //       icon: 'smile',
              //       component: './Welcome',
              //       authority: ['admin'],
              //     },
              //   ],
              // },
              {
                name: '企业列表',
                icon: 'table',
                path: '/firmList',
                component: './FirmList',
                routes: [
                  {
                    path: '/',
                    redirect: '/firmList',
                  },
                  {
                    name: '企业列表',
                    icon: 'table',
                    path: '/firmList',
                    hideInMenu: true,
                    component: './FirmList',
                  },
                  {
                    path: '/firmList/firmDetail',
                    name: '企业列表',
                    hideInMenu: true,
                    component: './FirmList/FirmDetail',
                  },
                ],
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
