import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { store } from '../store'
import layout from '../layout/index.vue'
// 静态路由
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: layout,
    redirect: '/home',
    meta: {
      title: '首页',
      icon: 'ic ic-homepage-fill'
    },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home/home.vue'),
        meta: {
          title: '首页',
          icon: 'ic ic-homepage-fill'
        }
      }
    ]
  },
  {
    path: '/',
    component: layout,
    meta: {
      title: '系统设置',
      icon: 'ic ic-homepage-fill'
    },
    children: [
      {
        path: '/accountManagement',
        name: 'accountManagement',
        component: () => import('@/views/systemSettings/accountManagement/index.vue'),
        meta: {
          title: '账号设置',
          icon: 'ic ic-homepage-fill'
        }
      },
      {
        path: '/roleManagement',
        name: 'roleManagement',
        component: () => import( '@/views/systemSettings/roleManagement/index.vue'),
        meta: {
          title: '角色设置',
          icon: 'ic ic-homepage-fill'
        }
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login/index.vue'),
    meta: {
      title: {
        '/zh-CN': '登录',
        '/en-US': 'Login'
      },
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/noFound',
    name: 'NoFound',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: {
        '/zh-CN': '404',
        '/en-US': '404'
      },
      hidden: true,
      hiddenTab: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import(/* webpackChunkName: "noFound" */ '@/views/noFound.vue'),
    meta: {
      title: {
        '/zh-CN': '未找到',
        '/en-US': 'NOT FOUND'
      },
      hidden: true,
      hiddenTab: true
    }
  }
]

// 异步路由
export const asyncRoutes: Array<RouteRecordRaw> = []

// function otherRoutePath(to, next) {
//   if (!to) {
//     next('/500');
//   } else if (to && to.path === '/loginExt') {
//     store.dispatch('removeLoginExtInfo', {})
//     next();
//   } else if (to && to.path && [ '/login', '/404', '/505', '/403', '/forgotpassword','/qrCode/orderSign' ].indexOf(to.path) !== -1) {
//     next();
//   } else {
//     next('/login');
//   }
// }

const router = createRouter({
  history: createWebHistory(), // hash模式：createWebHashHistory，history模式：createWebHistory
  scrollBehavior: () => ({
    top: 0
  }),
  routes: constantRoutes
})

router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem('accessToken')
  if (token) {
    if (to.path === '/login') {
      next({ path: '/home' })
    }else {
      const hasRoutes =  store.getters['permissionModule/getAccessRoutes']
      console.log(hasRoutes.length)
      if (hasRoutes && hasRoutes.length > 4) {
        next()
      } else {
        try {
          // const dynamicRoutes = await Service.getDynamicRoutes({
          //   tenantId: 1
          // })
          store.commit('permissionModule/setAccessRoutes', constantRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // await store.dispatch('user/resetToken')
          // Message.error(error || 'Has Error')
          // next({ path: 'login' })
          // NProgress.done()
        }
      }
    }
  }else{
    if(to.path === '/login'){
      next()
    }
    next({ path: 'login' })
  }
})



export default router
