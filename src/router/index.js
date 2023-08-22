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
        // component: () => import('@/views/dashboard/index'),
        component: () => import('@/views/dashboard'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },

  // {
  //   path: '/upload',
  //   component: Layout,
  //   children: [{
  //     path: '/upload',
  //     component: ()=>import('@/views/excel/upload-excel'),
  //     name: 'icons',
  //     meta: { title: '批量上传', icon: 'excel' }
  //   }]
  // },
  {
    path: '/upload',
    component: Layout,
    redirect: '/upload',
    name: 'Upload',
    meta: {
      title: '批量上传',
      icon: 'excel'
    },
    children: [
      {
        path: '/uploadActor',
        component: () => import('@/views/excel/upload-excel-actor'),
        name: 'UploadActor',
        meta: { title: '角色上传' }
      },
      // {
      //   path: '/uploadAnimation',
      //   component: () => import('@/views/excel/upload-excel-anim'),
      //   name: 'uploadAnimation',
      //   meta: { title: '动画上传' }
      // },
      // {
      //   path: '/uploadAudio',
      //   component: () => import('@/views/excel/upload-excel-audio'),
      //   name: 'uploadAudio',
      //   meta: { title: '音频上传' }
      // },
      {
        path: '/uploadBackground',
        component: () => import('@/views/excel/upload-excel-bg'),
        name: 'uploadBackground',
        meta: { title: '背景上传' }
      },
      {
        path: '/uploadItems',
        component: () => import('@/views/excel/upload-excel-items'),
        name: 'uploadItems',
        meta: { title: '道具上传' }
      }
      // {
      //   path: '/uploadOthers',
      //   component: () => import('@/views/excel/upload-excel-others'),
      //   name: 'uploadOthers',
      //   meta: { title: '其他上传' }
      // }
    ]
  },
  {
    path: '/audit',
    component: Layout,
    redirect: '/audit',
    name: 'Audit',
    meta: {
      title: '资源审核',
      icon: 'edit'
    },
    children: [
      {
        path: '/auditActor',
        component: () => import('@/views/audit/auditActor'),
        name: 'AuditActor',
        meta: { title: '角色审核' }
      },
      {
        path: '/ActorDetail/:id',
        component: () => import('../../web/src/views/create/ActorDetail'),
        name: 'ActorDetail',
        meta: { title: '角色详情' },
        hidden: true,
        props: true
      },
      // {
      //   path: '/auditAnimation',
      //   component: () => import('@/views/audit/auditAnimation'),
      //   name: 'AuditAnimation',
      //   meta: { title: '动画审核' }
      // },
      // {
      //   path: '/AnimationDetail/:id',
      //   component: () => import('../../web/src/views/create/AnimationDetail'),
      //   name: 'AnimationDetail',
      //   meta: { title: '动画详情' },
      //   hidden: true,
      //   props: true
      // },
      // {
      //   path: '/auditAudio',
      //   component: () => import('@/views/audit/auditAudio'),
      //   name: 'AuditAudio',
      //   meta: { title: '音频审核' }
      // },
      // {
      //   path: '/AudioDetail/:id',
      //   component: () => import('../../web/src/views/create/AudioDetail'),
      //   name: 'AudioDetail',
      //   meta: { title: '音频详情' },
      //   hidden: true,
      //   props: true
      // },
      {
        path: '/auditBackground',
        component: () => import('@/views/audit/auditBackground'),
        name: 'AuditBackground',
        meta: { title: '背景审核' }
      },
      {
        path: '/BackgroundDetail/:id',
        component: () => import('../../web/src/views/create/BackgroundDetail'),
        name: 'BackgroundDetail',
        meta: { title: '背景详情' },
        hidden: true,
        props: true
      },
      {
        path: '/auditItems',
        component: () => import('@/views/audit/auditItems'),
        name: 'AuditItems',
        meta: { title: '道具审核' }
      },
      {
        path: '/ItemsDetail/:id',
        component: () => import('../../web/src/views/create/ItemsDetail'),
        name: 'ItemsDetail',
        meta: { title: '道具详情' },
        hidden: true,
        props: true
      }
      // {
      //   path: '/auditOthers',
      //   component: () => import('@/views/audit/auditOthers'),
      //   name: 'AuditOthers',
      //   meta: { title: '其他审核' }
      // },
      // {
      //   path: '/OthersDetail/:id',
      //   component: () => import('../../web/src/views/create/OthersDetail'),
      //   name: 'OthersDetail',
      //   meta: { title: '其他详情' },
      //   hidden: true,
      //   props: true
      // }
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
        component: () => import('@/views/manage/manageActor'),
        name: 'ActorManage',
        meta: { title: '角色管理' }
      },
      {
        path: 'uploadActor',
        component: () => import('../../web/src/views/create/uploadActor'),
        name: 'UploadActor',
        meta: { title: '上传角色' },
        hidden: true
      },
      {
        path: '/EditActor/:id',
        component: () => import('../../web/src/views/create/editActor'),
        name: 'EditActor',
        meta: { title: '编辑角色' },
        hidden: true,
        props: true
        // meta: { title: '角色' }
      },
      {
        path: '/convMatMapList',
        component: () => import("@/views/manage/convMatMapList"),
        name: 'convMatMapList',
        meta: {title: '一级映射'},
        hidden: true
      },
      {
        path: '/convMatMapListChild',
        component: () => import("@/views/manage/convMatMapListChild"),
        name: 'convMatMapListChild',
        meta: {title: '二级映射'},
        hidden: true
      },
      // {
      //   path: '/AnimationManage',
      //   component: () => import('@/views/manage/manageAnimation'),
      //   name: 'AnimationManage',
      //   meta: { title: '动画管理' }
      // },
      // {
      //   path: 'uploadAnimation',
      //   component: () => import('../../web/src/views/create/uploadAnimation'),
      //   name: 'UploadAnimation',
      //   meta: { title: '上传动画' },
      //   hidden: true
      // },
      // {
      //   path: '/EditAnimation/:id',
      //   component: () => import('../../web/src/views/create/uploadAnimation'),
      //   name: 'EditAnimation',
      //   meta: { title: '编辑动画' },
      //   hidden: true,
      //   props: true
      // },
      // {
      //   path: '/AudioManage',
      //   component: () => import('@/views/manage/manageAudio'),
      //   name: 'AudioManage',
      //   meta: { title: '音频管理' }
      // },
      // {
      //   path: 'uploadAudio',
      //   component: () => import('../../web/src/views/create/uploadAudio'),
      //   name: 'UploadAudio',
      //   meta: { title: '上传音频' },
      //   hidden: true
      // },
      // {
      //   path: '/EditAudio/:id',
      //   component: () => import('../../web/src/views/create/uploadAudio'),
      //   name: 'EditAudio',
      //   meta: { title: '编辑音频' },
      //   hidden: true,
      //   props: true
      // },
      {
        path: '/BackgroundManage',
        component: () => import('@/views/manage/manageBackground'),
        name: 'BackgroundManage',
        meta: { title: '背景管理' }
      },
      {
        path: 'uploadBackground',
        component: () => import('../../web/src/views/create/uploadBackground'),
        name: 'UploadBackground',
        meta: { title: '上传背景' },
        hidden: true
      },
      {
        path: '/EditBackground/:id',
        component: () => import('../../web/src/views/create/uploadBackground'),
        name: 'EditBackground',
        meta: { title: '编辑背景' },
        hidden: true,
        props: true
      },
      {
        path: '/ItemsManage',
        component: () => import('@/views/manage/manageItems'),
        name: 'ItemsManage',
        meta: { title: '道具管理' }
      },
      {
        path: 'uploadItems',
        component: () => import('../../web/src/views/create/uploadItems'),
        name: 'UploadItems',
        meta: { title: '上传道具' },
        hidden: true
      },
      {
        path: '/EditItems/:id',
        component: () => import('../../web/src/views/create/uploadItems'),
        name: 'EditItems',
        meta: { title: '编辑道具' },
        hidden: true,
        props: true
      }
      // {
      //   path: '/OthersManage',
      //   component: () => import('@/views/manage/manageOthers'),
      //   name: 'OthersManage',
      //   meta: { title: '其他素材管理' }
      // },
      // {
      //   path: 'uploadOthers',
      //   component: () => import('../../web/src/views/create/uploadOthers'),
      //   name: 'UploadOthers',
      //   meta: { title: '上传其他素材' },
      //   hidden: true
      // },
      // {
      //   path: '/EditOthers/:id',
      //   component: () => import('../../web/src/views/create/uploadOthers'),
      //   name: 'EditOthers',
      //   meta: { title: '编辑其他素材' },
      //   hidden: true,
      //   props: true
      // }

    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    name: 'User',
    meta: {
      title: '用户管理',
      icon: 'user'
    },
    children: [
      {
        path: 'CreateAdmin',
        component: () => import('@/views/user/AdminDetail'),
        name: 'CreateAdmin',
        meta: {
          title: '新建管理员'
        }
      },
      {
        path: 'AdminList',
        component: () => import('@/views/user/AdminList'),
        name: 'AdminList',
        meta: {
          title: '管理员列表'
        }
      },
      {
        path: '/EditAdmin/:id',
        component: () => import('@/views/user/AdminDetail'),
        name: 'EditAdmin',
        meta: {
          title: '修改管理员'
        },
        hidden: true,
        props: true
      },
      {
        path: 'UserList',
        component: () => import('@/views/user/UserList'),
        name: 'UserList',
        meta: {
          title: '用户列表'
        }
      },
      {
        path: '/EditUser/:id',
        component: () => import('@/views/user/UserDetail'),
        name: 'EditUser',
        meta: {
          title: '修改用户'
        },
        hidden: true
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '页面权限',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },

      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色权限',
          roles: ['admin']
        }
      },
      {
        path: 'CreateAdmin',
        component: () => import('@/views/user/AdminDetail'),
        name: 'CreateAdmin',
        meta: {
          title: '新建管理员',
          roles: ['admin']
        }
      },
      {
        path: 'AdminList',
        component: () => import('@/views/user/AdminList'),
        name: 'AdminList',
        meta: {
          title: '管理员列表',
          roles: ['admin']
        }
      },
      {
        path: '/EditAdmin/:id',
        component: () => import('@/views/user/AdminDetail'),
        name: 'EditAdmin',
        props: true
      }
    ]
  },

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
