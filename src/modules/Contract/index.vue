<template>
  <div class="row">

    <div class="card">
<!-- ++++++++++++++++++++++++++++++++     LIST     +++++++++++++++++++++++++++++++++++++++++-->

      <template v-if="actions==='LIST'">
        <br>
        <button type="button" class="btn btn-lg btn-fill btn-success pull-right" @click="Create">
          <span class="btn-label">
            <i class="fa fa-plus"></i>
          </span>
          Nueva Instancia
        </button>
        <br>
        <br>
        <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
          <template slot="buttons" slot-scope="props">
            <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
              <a class="btn btn-simple btn-xs btn-icon btn-info" @click="Modify(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
              <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="Remove(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
            </el-tooltip>
          </template>
        </data-tables>
      </template>
<!-- ++++++++++++++++++++++++++++++++     MODIFY     +++++++++++++++++++++++++++++++++++++++++-->

      <template v-if="actions==='MODIFY'">
        <br>
        <button type="button" class="btn btn-lg btn-fill btn-warning pull-right" @click="Back">
          <span class="btn-label">
            <i class="fa fa-angle-double-left"></i>
          </span>
          Cancelar
        </button>
        <br>
        <br>
        <br>
        mod
      </template>
<!-- ++++++++++++++++++++++++++++++++     REMOVE     +++++++++++++++++++++++++++++++++++++++++-->
      <template v-if="actions==='REMOVE'">
        <baja :index="i" v-on:Back="Back"></baja>
      </template>
<!-- ++++++++++++++++++++++++++++++++     CREATE     +++++++++++++++++++++++++++++++++++++++++-->
      <template v-if="actions==='CREATE'">
        <alta  v-on:Back="Back"></alta>
      </template>
    </div>


  </div>
</template>
<script>
  import Vue from 'vue'
  import {Tooltip} from 'element-ui'
  import swal from 'sweetalert2'
  import Alta from './Alta'
  import Baja from './Baja'

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
        this.actions = 'MODIFY'
        this.loadDependency()
        this.loadBranches()
        this.loadposition()
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
      Baja,
      Alta
    }
  }
</script>
<style>
</style>
