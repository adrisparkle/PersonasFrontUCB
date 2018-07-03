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
// Distribution Module
import Dist from 'src/modules/Distribution'
// Level Module
import Level from 'src/modules/Level'
// Positions Module
import Positions from 'src/modules/Positions'
// PerformanceArea Module
import PerformanceArea from 'src/modules/PerformanceArea'
// OrganizationalUnit Module
import OrganizationalUnit from 'src/modules/OrganizationalUnit'
// Dependency Module
import Dependency from 'src/modules/Dependency'


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

let distMenu = {
  path: '/distribution',
  component: Layout,
  redirect: '/distribution',
  children: [
    {
      path: '/',
      name: 'Distribución por centros de costo',
      component: Dist,
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

let levelMenu = {
  path: '/levels',
  component: Layout,
  redirect: '/levels',
  children: [
    {
      path: '/',
      name: 'Nivel Gerarquico',
      component: Level,
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

let positionsMenu = {
  path: '/positions',
  component: Layout,
  redirect: '/positions',
  children: [
    {
      path: '/',
      name: 'Cargos',
      component: Positions,
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

let dependencyMenu = {
  path: '/dependency',
  component: Layout,
  redirect: '/dependency',
  children: [
    {
      path: '/',
      name: 'Dependencia Organigrama',
      component: Dependency,
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

let performanceAreaMenu = {
  path: '/performancearea',
  component: Layout,
  redirect: '/performancearea',
  children: [
    {
      path: '/',
      name: 'Area Desempeño',
      component: PerformanceArea,
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

let organizationalUnitMenu = {
  path: '/organizationalunit',
  component: Layout,
  redirect: '/organizationalunit',
  children: [
    {
      path: '/',
      name: 'Unidad Organizacional',
      component: OrganizationalUnit,
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
  distMenu,
  levelMenu,
  positionsMenu,
  performanceAreaMenu,
  organizationalUnitMenu,
  dependencyMenu,
  {path: '*', component: NotFound}
]

export default new VueRouter({
  routes
  // mode: 'history'
})
