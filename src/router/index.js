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
// Centros de Resp Module
import B1UnidadOrganizacional from 'src/modules/B1UnidadOrganizacional'
import B1PEI from 'src/modules/B1PEI'
import B1PlanEstudios from 'src/modules/B1PlanEstudios'
import B1Paralelo from 'src/modules/B1Paralelo'
import B1Periodo from 'src/modules/B1Periodo'
import B1Proyecto from 'src/modules/B1Proyecto'


// import store from '../store'
Vue.use(VueRouter)

let Menu = {
  path: '/',
  component: Layout,
  redirect: '/',
  children: [
    {
      path: 'module/',
      name: 'Modulos',
      component: Module
    },
    {
      path: 'persona/',
      name: 'Empleados',
      component: Employee
    },
    {
      path: 'regional/',
      name: 'Regionales',
      component: Branches
    },
    {
      path: 'rol/',
      name: 'Roles',
      component: Roles
    },
    {
      path: 'acceso/',
      name: 'Permisos',
      component: Access
    },
    {
      path: 'usuario/',
      name: 'Usuarios',
      component: Users
    },
    {
      path: 'distribution/',
      name: 'Distribución por Centros de Responsabilidad',
      component: Dist
    },
    {
      path: 'nivel/',
      name: 'Nivel Gerarquico',
      component: Level
    },
    {
      path: 'cargo/',
      name: 'Cargos',
      component: Positions
    },
    {
      path: 'dependencias/',
      name: 'Dependencia Organigrama',
      component: Dependency
    },
    {
      path: 'areadesempenio/',
      name: 'Area Desempeño',
      component: PerformanceArea
    },
    {
      path: 'unidadorganizacional/',
      name: 'Unidad Organizacional',
      component: OrganizationalUnit
    },
    {
      path: 'grupocontable/',
      name: 'Grupo Contable',
      component: GrupoContable
    },
    {
      path: 'profile/',
      name: 'User Page',
      component: UserProfile
    },
    {
      path: 'cuentascontables/',
      name: 'Cuentas Contables',
      component: CuentasContables
    },
    {
      path: 'tipoempleadodistribucion/',
      name: 'Tipo Empleado Distribucion',
      component: TipoEmpleadoDist
    },
    {
      path: '/proceso',
      name: 'Historial de Procesos',
      component: Process
    },
    {
      path: '/B1UnidadOrganizacional',
      name: 'Unidades Organizacionales',
      component: B1UnidadOrganizacional
    },
    {
      path: '/B1PEI',
      name: 'PEI',
      component: B1PEI
    },
    {
      path: '/B1PlanEstudios',
      name: 'Planes de Estudios',
      component: B1PlanEstudios
    },
    {
      path: '/B1Paralelo',
      name: 'Paralelos',
      component: B1Paralelo
    },
    {
      path: '/B1Periodo',
      name: 'Periodos',
      component: B1Periodo
    },
    {
      path: '/B1Proyecto',
      name: 'Proyectos',
      component: B1Proyecto
    }
  ]
}

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  Menu,
  {path: '*', component: NotFound}
]

export default new VueRouter({
  routes,
  mode: 'hash'
})
