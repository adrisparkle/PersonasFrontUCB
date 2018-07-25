<template>
  <div class="row">
    <div class="col-md-8 card">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="props.handleEdit(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="props.handleDelete(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <div class="col-md-4">
      <crud-form v-bind="{url,formData}">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" class="form-control" v-model="Name">
        </div>
        <div class="form-group">
          <label>Nivel</label>
          <input type="text" placeholder="Nivel" class="form-control" v-model="Level">
        </div>
      </crud-form>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Tooltip} from 'element-ui'
  Vue.use(Tooltip)
  export default {
    computed: {
      Name: {
        get () {
          return this.$store.state.crud.formData.Name
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Name', val: value})
        }
      },
      Level: {
        get () {
          return this.$store.state.crud.formData.Level
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Level', val: value})
        }
      }
    },
    data () {
      return {
        url: '/payroll/process/',
        propsToSearch: ['Name', 'Level'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Name',
            label: 'Segmento  ',
            minWidth: 100
          },
          {
            prop: 'gestion',
            label: 'Gestion',
            minWidth: 100
          },
          {
            prop: 'mes',
            label: 'Mes',
            minWidth: 50
          },
          {
            prop: 'State',
            label: 'Estado',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        formData: {
          Name: null,
          Level: null
        }
      }
    },
    methods: {
      addAccess (index) {
        this.$store.commit('crud/editSetter')
      }
    }
  }
</script>
<style>
</style>
