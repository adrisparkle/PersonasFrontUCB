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
// Grupo Contable Module
import GrupoContable from 'src/modules/GrupoContable'
// Cuentas Contable Module
import CuentasContables from 'src/modules/CuentasContables'
// Tipo Empleado dist Module
import TipoEmpleadoDist from 'src/modules/TipoEmpleadoDist'
// Process Module
import Process from 'src/modules/Process'
// Menu Module
import Module from 'src/modules/Menu'


// import store from '../store'
Vue.use(VueRouter)

let moduleMenu = {
  path: '/module/',
  component: Layout,
  redirect: '/module/',
  children: [
    {
      path: '/',
      name: 'Modulos',
      component: Module
    }
  ]
}

let profileMenu = {
  path: '/user',
  component: Layout,
  redirect: '/user/profile',
  children: [
    {
      path: 'profile',
      name: 'User Page',
      component: UserProfile
    }
  ]
}

let employeeMenu = {
  path: '/persona/',
  component: Layout,
  redirect: '/persona/',
  children: [
    {
      path: '/',
      name: 'Empleados',
      component: Employee
    }
  ]
}

let branchesMenu = {
  path: '/regional',
  component: Layout,
  redirect: '/regional',
  children: [
    {
      path: '/',
      name: 'Regionales',
      component: Branches
    }
  ]
}

let rolesMenu = {
  path: '/rol',
  component: Layout,
  redirect: '/rol',
  children: [
    {
      path: '/',
      name: 'Roles',
      component: Roles
    }
  ]
}
let accessMenu = {
  path: '/acceso',
  component: Layout,
  redirect: '/acceso',
  children: [
    {
      path: '/',
      name: 'Permisos',
      component: Access
    }
  ]
}

let usersMenu = {
  path: '/usuario',
  component: Layout,
  redirect: '/usuario',
  children: [
    {
      path: '/',
      name: 'Usuarios',
      component: Users
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
      component: Dist
    }
  ]
}

let levelMenu = {
  path: '/nivel',
  component: Layout,
  redirect: '/nivel',
  children: [
    {
      path: '/',
      name: 'Nivel Gerarquico',
      component: Level
    }
  ]
}

let positionsMenu = {
  path: '/cargo',
  component: Layout,
  redirect: '/cargo',
  children: [
    {
      path: '/',
      name: 'Cargos',
      component: Positions
    }
  ]
}

let dependencyMenu = {
  path: '/dependencias/',
  component: Layout,
  redirect: '/dependencias/',
  children: [
    {
      path: '/',
      name: 'Dependencia Organigrama',
      component: Dependency
    }
  ]
}

let performanceAreaMenu = {
  path: '/areadesempenio/',
  component: Layout,
  redirect: '/areadesempenio/',
  children: [
    {
      path: '/',
      name: 'Area Desempeño',
      component: PerformanceArea
    }
  ]
}

let organizationalUnitMenu = {
  path: '/unidadorganizacional',
  component: Layout,
  redirect: '/unidadorganizacional',
  children: [
    {
      path: '/',
      name: 'Unidad Organizacional',
      component: OrganizationalUnit
    }
  ]
}

let grupoContableMenu = {
  path: '/grupocontable',
  component: Layout,
  redirect: '/grupocontable',
  children: [
    {
      path: '/',
      name: 'Grupo Contable',
      component: GrupoContable
    }
  ]
}

let cuentasContablesMenu = {
  path: '/cuentascontables',
  component: Layout,
  redirect: '/cuentascontables',
  children: [
    {
      path: '/',
      name: 'Cuentas Contables',
      component: CuentasContables
    }
  ]
}

let tipoEmpleadoDistMenu = {
  path: '/tipoempleadodistribucion',
  component: Layout,
  redirect: '/tipoempleadodistribucion',
  children: [
    {
      path: '/',
      name: 'Tipo Empleado Distribucion',
      component: TipoEmpleadoDist
    }
  ]
}

let processMenu = {
  path: '/proceso',
  component: Layout,
  redirect: '/proceso',
  children: [
    {
      path: '/',
      name: 'Procesos',
      component: Process
    }
  ]
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  profileMenu,
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
  grupoContableMenu,
  cuentasContablesMenu,
  tipoEmpleadoDistMenu,
  processMenu,
  moduleMenu,
  {path: '*', component: NotFound}
]

export default new VueRouter({
  routes
  // mode: 'history'
})
