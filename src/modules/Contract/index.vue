<template>
  <div>
    <div>
      <Navbar></Navbar>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </div>

  </div>
</template>
<script>
  import Vue from 'vue'
  import {Tooltip} from 'element-ui'
  import swal from 'sweetalert2'
  import Alta from './Alta'
  import Baja from './Baja'
  import DetailEmpleado from '../Employees/DetailEmpleado'
  import Navbar from './Navbar'


  Vue.use(Tooltip)
  export default {
    data () {
      return {
        i: null,
        actions: 'LIST',
        url: '/Contract/',
        propsToSearch: ['FullName', 'CUNI', 'Document', 'Dependency', 'Branches', 'StartDate'],
        tableColumns: [
          {
            prop: 'CUNI',
            label: 'CUNI',
            minWidth: 120
          },
          {
            prop: 'Document',
            label: 'Documento',
            minWidth: 100
          },
          {
            prop: 'FullName',
            label: 'Nombre Completo',
            minWidth: 250
          },
          {
            prop: 'DependencyCod',
            label: 'Cod. Dependecia',
            minWidth: 250
          },
          {
            prop: 'Dependency',
            label: 'Dependencia',
            minWidth: 250
          },
          {
            prop: 'Branches',
            label: 'Regional',
            minWidth: 80
          },
          {
            prop: 'Positions',
            label: 'Cargo',
            minWidth: 150
          },
          {
            prop: 'Dedication',
            label: 'Dedicacion',
            minWidth: 90
          },
          {
            prop: 'Linkage',
            label: 'Vinculacion',
            minWidth: 100
          },
          {
            prop: 'StartDate',
            label: 'Fecha Inicio',
            minWidth: 120
          },
          {
            prop: 'EndDate',
            label: 'Fecha Fin',
            minWidth: 120
          }
        ],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [10, 20, 50, 100],
          total: 0
        }
      }
    },
    methods: {
      Modify (index) {
        this.i = index
        this.actions = 'MODIFY'
      },
      Remove (index) {
        swal({
          title: '¿Estas Seguro?',
          text: 'Se dará de baja a esta persona',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, dar de baja!',
          cancelButtonText: 'No, cancelar',
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          buttonsStyling: false
        })
          .then((willDelete) => {
            if (willDelete) {
              this.i = index
              this.actions = 'REMOVE'
            } else {
              this.actions = 'LIST'
            }
          })
      },
      Create () {
        this.actions = 'CREATE'
      },
      Back () {
        this.actions = 'LIST'
      }
    },
    components: {
      DetailEmpleado,
      Baja,
      Alta,
      Navbar
    }
  }
</script>
<style>
</style>
