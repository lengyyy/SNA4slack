import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/404', component: _import('404'), hidden: true },
  { path: '/',
    alias: '/index',
    component: _import('entrance'),
    hidden: true },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    name: 'Dashboard',
    children: [{
      path: 'index',
      component: _import('dashboard/index'),
      meta: { title: 'Dashboard', icon: 'example' }
    }]
  },
  {
    path: '/channels',
    component: Layout,
    redirect: '/channels/mixed-channel',
    name: 'channels',
    meta: { title: 'Channel Analysis', icon: 'example' },
    children: [
      {
        path: 'mixed-channel',
        name: 'mixed-channel',
        component: _import('analysis/overview'),
        meta: { title: 'Mixed Channels', icon: 'table' }
      },
      {
        path: ':channelId',
        name: 'channelSingle',
        hidden: true,
        component: _import('analysis/single_channel'),
        props: true
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: _import('form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
