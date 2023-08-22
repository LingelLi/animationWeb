import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'


NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/reg','/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  // console.log(hasToken)

  if (hasToken) {
    // console.log("hasTokenOK")
    if (to.path === '/login') {
      console.log("topathOK")
      // if is logged in, redirect to the home page
      next({ path: '/' })
      // return
      NProgress.done()
    } else 
    {
      const hasGetUserInfo = store.getters.name
      const username = JSON.parse(localStorage.getItem("name"));
      // console.log("hasGetUserInfo name:")
      // console.log(hasGetUserInfo)
      // console.log("hasGetUserInfo username:")
      // console.log(username)
      if (username) {
        // console.log("hasGetUserInfoOK")
        // console.log('permission roles', store.getters.roles)
        // console.log(this.$store.state.permission_routes)
        next()
      } else {
        try {
          // console.log('permission roles', store.getters.roles)
          console.log("hasGetUserInfoELSE")
          const { roles } = await store.dispatch('user/getInfo')          // 2. 首次登录从用户信息中获取用户权限列表
          console.log(roles)
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles)   // 3. 根据用户权限列表生成用户可访问动态路由表
          router.addRoutes(accessRoutes)                    // 4. 将用户动态路由表挂载到 router
          
          next({ ...to, replace: true })
        } 
    // {
    //   const hasGetUserInfo = store.getters.name
    //   if (hasGetUserInfo) {
    //     console.log("hasGetUserInfoOK")
    //     console.log(store.getters.permission_routes)
    //     next()
    //     // return
    //   } else {
    //     try {
    //       console.log("hasGetUserInfoELSE")
    //       next()
    //     } 
        catch (error) {
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
