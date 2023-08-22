import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'
import Vue from 'vue'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: require("@/image/profile.jpg"),
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }

}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    console.log(username)
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        console.log(data)
        // commit('SET_TOKEN', data.token)
        commit('SET_TOKEN', 'admin-token')
        // 这里用来设置用户的头像
        commit('SET_AVATAR', require("@/image/profile.jpg"))
        commit('SET_NAME', username)
        localStorage.setItem('name', JSON.stringify(username))
        setToken('admin-token')
        resolve()
      }).catch(error => {
        Vue.prototype.$message({
          type: "error",
          message: error.response.data.message
        })
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    const username = JSON.parse(localStorage.getItem('name'))
    commit('SET_TOKEN', 'admin-token')
    commit('SET_AVATAR', require("@/image/profile.jpg"))
    commit('SET_NAME', username)
    return new Promise((resolve, reject) => {
      getInfo(state.username).then(response => {
        const { data } = response
        // const { data } = {
        //   roles: ['admin'],
        //   introduction: 'I am a super administrator',
        //   avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        //   name: 'Super Admin'
        // }

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar } = data
        console.log('getInfoRoles')
        console.log(roles)
        // const { roles } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_ROLES', roles)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

