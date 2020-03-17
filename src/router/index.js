import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },

  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: { title: '用户管理', icon: 'tree' },
    children: [
      {
        path: 'normal',
        name: 'Normal',
        component: () => import('@/views/user/normal'),
        meta: { title: '普通用户', icon: 'user' }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/user/teacher'),
        meta: { title: '教师管理', icon: 'teacher' }
      }
    ]
  },

  {
    path: '/experience',
    component: Layout,
    name: 'Experience',
    children: [
      {
        path: 'index',
        name: 'Experience',
        component: () => import('@/views/experience/index'),
        meta: { title: '经验百科', icon: 'example' }
      }
    ]
  },

  {
    path: '/learning',
    component: Layout,
    name: 'Learning',
    children: [
      {
        path: 'index',
        name: 'Learning',
        component: () => import('@/views/learning/index'),
        meta: { title: '学习攻略', icon: 'form' }
      }
    ]
  },

  {
    path: '/tutsau',
    component: Layout,
    name: 'Tutsau',
    children: [
      {
        path: 'index',
        name: 'Tutsau',
        component: () => import('@/views/tutsau/index'),
        meta: { title: '吐槽管理', icon: 'tutsau' }
      }
    ]
  },

  {
    path: '/video',
    component: Layout,
    name: 'Video',
    children: [
      {
        path: 'index',
        name: 'Video',
        component: () => import('@/views/video/index'),
        meta: { title: '视频管理', icon: 'video' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
