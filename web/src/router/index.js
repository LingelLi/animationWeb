import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules
import componentsRouter from './modules/components'
import chartsRouter from './modules/charts'
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'  */

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
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
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/reg',
    component: () => import('@/views/login/reg'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  // {
  //   path: '/profile',
  //   component: Layout,
  //   redirect: '/profile/index',
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/profile/index'),
  //       name: 'Profile',
  //       meta: { title: 'profile', icon: 'user', noCache: true }
  //     }
  //   ]
  // },
  {
    path: '/download',
    component: Layout,
    redirect: '/download',
    name: 'Download',
    meta: {
      title: '资源下载',
      icon: 'edit'
    },
    children: [
      {
        path: '/downloadActor',
        component: () => import('../views/download/downloadActor'),
        name: 'DownloadActor',
        meta: { title: '角色' }
      },
      {
        path: '/ActorDetail/:id',
        component: () => import('../views/create/ActorDetail'),
        name: 'ActorDetail',
        meta: { title: '角色详情' },
        hidden: true,
        props: true
      },
      {
        path: '/downloadAnimation',
        component: () => import('../views/download/downloadAnimation'),
        name: 'downloadAnimation',
        meta: { title: '动画' }
      },
      {
        path: '/AnimationDetail/:id',
        component: () => import('../views/create/AnimationDetail'),
        name: 'AnimationDetail',
        meta: { title: '动画详情' },
        hidden: true,
        props: true
      },
      {
        path: '/downloadAudio',
        component: () => import('../views/download/downloadAudio'),
        name: 'downloadAudio',
        meta: { title: '音频' }
      },
      {
        path: '/AudioDetail/:id',
        component: () => import('../views/create/AudioDetail'),
        name: 'AudioDetail',
        meta: { title: '音频详情' },
        hidden: true,
        props: true
      },
      {
        path: '/downloadBackground',
        component: () => import('../views/download/downloadBackground'),
        name: 'downloadBackground',
        meta: { title: '背景' }
      },
      {
        path: '/BackgroundDetail/:id',
        component: () => import('../views/create/BackgroundDetail'),
        name: 'BackgroundDetail',
        meta: { title: '背景详情' },
        hidden: true,
        props: true
      },
      // {
      //   path: '/downloadEnvironment',
      //   component: () => import('../views/download/downloadEnvironment'),
      //   name: 'downloadEnvironment',
      //   meta: { title: '环境' }
      // },
      // {
      //   path: '/EnvironmentDetail/:id',
      //   component: () => import('../views/create/EnvironmentDetail'),
      //   name: 'EnvironmentDetail',
      //   meta: { title: '环境详情' },
      //   hidden: true,
      //   props: true
      // },
      // {
      //   path: '/downloadHome',
      //   component: () => import('../views/download/downloadHome'),
      //   name: 'downloadHome',
      //   meta: { title: '家居' }
      // },
      // {
      //   path: '/HomeDetail/:id',
      //   component: () => import('../views/create/HomeDetail'),
      //   name: 'HomeDetail',
      //   meta: { title: '家居详情' },
      //   hidden: true,
      //   props: true
      // },
      {
        path: '/downloadItems',
        component: () => import('../views/download/downloadItems'),
        name: 'downloadItems',
        meta: { title: '道具' }
      },
      {
        path: '/ItemsDetail/:id',
        component: () => import('../views/create/ItemsDetail'),
        name: 'ItemsDetail',
        meta: { title: '道具详情' },
        hidden: true,
        props: true
      },
      {
        path: '/downloadOthers',
        component: () => import('../views/download/downloadOthers'),
        name: 'downloadOthers',
        meta: { title: '其他素材' }
      },
      {
        path: '/OthersDetail/:id',
        component: () => import('../views/create/OthersDetail'),
        name: 'OthersDetail',
        meta: { title: '其他详情' },
        hidden: true,
        props: true
      },
    ]
  },

  {
    path: '/manage',
    component: Layout,
    redirect: '/manage',
    name: 'Manage',
    meta: {
      title: '我的资源',
      icon: 'nested'
    },
    children: [
      {
        path: '/ActorManage',
        component: () => import('../views/manage/manageActor'),
        name: 'ActorManage',
        meta: { title: '角色管理' }
      },
      {
        path: 'uploadActor',
        component: () => import('@/views/create/uploadActor'),
        name: 'UploadActor',
        meta: { title: '上传角色' },
        hidden: true 
      },
      {
        path: '/EditActor/:id',
        component: () => import('../views/create/uploadActor'),
        name: 'EditActor',
        meta: { title: '编辑角色' },
        hidden: true,
        props: true
        // meta: { title: '角色' }
      },
      {
        path: '/AnimationManage',
        component: () => import('../views/manage/manageAnimation'),
        name: 'AnimationManage',
        meta: { title: '动画管理' }
      },
      {
        path: 'uploadAnimation',
        component: () => import('@/views/create/uploadAnimation'),
        name: 'UploadAnimation',
        meta: { title: '上传动画' },
        hidden: true 
      },
      {
        path: '/EditAnimation/:id',
        component: () => import('../views/create/uploadAnimation'),
        name: 'EditAnimation',
        meta: { title: '编辑动画' },
        hidden: true,
        props: true
      },
      {
        path: '/AudioManage',
        component: () => import('../views/manage/manageAudio'),
        name: 'AudioManage',
        meta: { title: '音频管理' }
      },
      {
        path: 'uploadAudio',
        component: () => import('@/views/create/uploadAudio'),
        name: 'UploadAudio',
        meta: { title: '上传音频' },
        hidden: true 
      },
      {
        path: '/EditAudio/:id',
        component: () => import('../views/create/uploadAudio'),
        name: 'EditAudio',
        meta: { title: '编辑音频' },
        hidden: true,
        props: true
      },
      {
        path: '/BackgroundManage',
        component: () => import('../views/manage/manageBackground'),
        name: 'BackgroundManage',
        meta: { title: '背景管理' }
      },
      {
        path: 'uploadBackground',
        component: () => import('@/views/create/uploadBackground'),
        name: 'UploadBackground',
        meta: { title: '上传背景' },
        hidden: true 
      },
      {
        path: '/EditBackground/:id',
        component: () => import('../views/create/uploadBackground'),
        name: 'EditBackground',
        meta: { title: '编辑背景' },
        hidden: true,
        props: true
      },
      // {
      //   path: '/EnvironmentManage',
      //   component: () => import('../views/manage/manageEnvironment'),
      //   name: 'EnvironmentManage',
      //   meta: { title: '环境管理' }
      // },
      // {
      //   path: 'uploadEnvironment',
      //   component: () => import('@/views/create/uploadEnvironment'),
      //   name: 'UploadEnvironment',
      //   meta: { title: '上传环境' },
      //   hidden: true 
      // },
      // {
      //   path: '/EditEnvironment/:id',
      //   component: () => import('../views/create/uploadEnvironment'),
      //   name: 'EditEnvironment',
      //   meta: { title: '编辑环境' },
      //   hidden: true,
      //   props: true
      // },
      // {
      //   path: '/HomeManage',
      //   component: () => import('../views/manage/manageHome'),
      //   name: 'HomeManage',
      //   meta: { title: '家居管理' }
      // },
      // {
      //   path: 'uploadHome',
      //   component: () => import('@/views/create/uploadHome'),
      //   name: 'UploadHome',
      //   meta: { title: '上传家居' },
      //   hidden: true 
      // },
      // {
      //   path: '/EditHome/:id',
      //   component: () => import('../views/create/uploadHome'),
      //   name: 'EditHome',
      //   meta: { title: '编辑家居' },
      //   hidden: true,
      //   props: true
      // },
      {
        path: '/ItemsManage',
        component: () => import('../views/manage/manageItems'),
        name: 'ItemsManage',
        meta: { title: '道具管理' }
      },
      {
        path: 'uploadItems',
        component: () => import('@/views/create/uploadItems'),
        name: 'UploadItems',
        meta: { title: '上传道具' },
        hidden: true 
      },
      {
        path: '/EditItems/:id',
        component: () => import('../views/create/uploadItems'),
        name: 'EditItems',
        meta: { title: '编辑道具' },
        hidden: true,
        props: true
      },
      {
        path: '/OthersManage',
        component: () => import('../views/manage/manageOthers'),
        name: 'OthersManage',
        meta: { title: '其他素材管理' }
      },
      {
        path: 'uploadOthers',
        component: () => import('@/views/create/uploadOthers'),
        name: 'UploadOthers',
        meta: { title: '上传其他素材' },
        hidden: true 
      },
      {
        path: '/EditOthers/:id',
        component: () => import('../views/create/uploadOthers'),
        name: 'EditOthers',
        meta: { title: '编辑其他素材' },
        hidden: true,
        props: true
      },

    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    name: 'User',
    meta: {
      title: '我的账户',
      icon: 'user'
    },
    children: [
      {
        path: 'UserDetail',
        component: () => import('../views/user/UserDetail'),
        name: 'UserDetail',
        meta: {
          title: '修改信息',
        }
      }
    ]
  },
  {
    path: '/developer',
    component: Layout,
    redirect: '/developer',
    name: 'Developer',
    meta: {
      title: '开发者社区',
      icon: 'international'
    },
    children: [
      {
        path: 'Developer',
        component: () => import('../views/developer/API'),
        name: 'Developer',
        meta: {
          title: '开发者社区',
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

  /** when your routing map is too long, you can split it into small modules **/

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



