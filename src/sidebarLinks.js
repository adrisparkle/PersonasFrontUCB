export default [
  {
    name: 'Auth',
    icon: 'fa fa-key',
    collapsed: false,
    children: [{
      name: 'Usuarios',
      path: '/users/'
    },
    {
      name: 'Roles',
      path: '/roles/'
    },
    {
      name: 'Accesos',
      path: '/access/'
    }]
  },
  {
    name: 'Organización',
    icon: 'fa fa-briefcase',
    collapsed: false,
    children: [{
      name: 'Regionales',
      path: '/branches/'
    },
    {
      name: 'Niveles',
      path: '/levels/'
    },
    {
      name: 'Cargos',
      path: '/positions/'
    },
    {
      name: 'Area Desempeño',
      path: '/performancearea/'
    },
    {
      name: 'Unidad Organizacional',
      path: '/organizationalunit/'
    },
    {
      name: 'Dependencia Organigrama',
      path: '/dependency/'
    }]
  },
  {
    name: 'Empleados',
    icon: 'fa fa-user-tie',
    path: '/employee/'
  },
  {
    name: 'Distribución',
    icon: 'fa fa-coins',
    path: '/distribution/'
  }
]
