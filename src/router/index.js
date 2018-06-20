import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from 'src/components/Layout/Layout.vue'
// GeneralViews
import NotFound from 'src/components/GeneralViews/NotFoundPage.vue'
// Pages
import UserProfile from 'src/components/User/UserProfile.vue'
// Auth Module
import Login from 'src/modules/Auth/Login.vue'
// Employees Module
import Employee from 'src/modules/Employees'
// Branches Module
import Branches from 'src/modules/Branches'
// Roles Module
import Roles from 'src/modules/Roles'
// Access Module
import Access from 'src/modules/Access'
// Users Module
import Users from 'src/modules/Users'

import store from '../store'

Vue.use(VueRouter)

let userMenu = {
  path: '/user',
  component: Layout,
  redirect: '/user/profile',
  children: [
    {
      path: 'profile',
      name: 'User Page',
      component: UserProfile,
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
}

let employeeMenu = {
  path: '/employee',
  component: Layout,
  redirect: '/employee',
  children: [
    {
      path: '/',
      name: 'Empleados',
      component: Employee,
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
}

let branchesMenu = {
  path: '/branches',
  component: Layout,
  redirect: '/branches',
  children: [
    {
      path: '/',
      name: 'Regionales',
      component: Branches,
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
}

let rolesMenu = {
  path: '/roles',
  component: Layout,
  redirect: '/roles',
  children: [
    {
      path: '/',
      name: 'Roles',
      component: Roles,
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
}
let accessMenu = {
  path: '/access',
  component: Layout,
  redirect: '/access',
  children: [
    {
      path: '/',
      name: 'Permisos',
      component: Access,
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
}

let usersMenu = {
  path: '/users',
  component: Layout,
  redirect: '/users',
  children: [
    {
      path: '/',
      name: 'Usuarios',
      component: Users,
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next()
        } else {
          next('/')
        }
      }
    }
  ]
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  userMenu,
  employeeMenu,
  branchesMenu,
  rolesMenu,
  accessMenu,
  usersMenu,
  {path: '*', component: NotFound}
]

export default new VueRouter({
  routes
  // mode: 'history'
})
