<template>
  <div>
    <div v-if="!access" class="row">
      <div class="col-md-8 card">
        <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
          <template slot="buttons" slot-scope="props">
            <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
              <a class="btn btn-simple btn-xs btn-icon btn-info" @click="props.handleEdit(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
              <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="props.handleDelete(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="Añadir Permisos" placement="top-start">
              <a class="btn btn-simple btn-xs btn-success btn-icon"  @click="addAccess(props.queriedData[props.index].Id)"><i class="fa fa-plus"></i></a>
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
          <div class="form-group">
            <label>AD GroupName</label>
            <input type="text" placeholder="ADGroupName" class="form-control" v-model="ADGroupName">
          </div>
          <div class="form-group">
            <el-select class="select-info"
                       size="large"
                       placeholder="Recurso"
                       v-model="ResourceId">
              <el-option v-for="option in values"
                         class="select-danger"
                         :value="option.Id"
                         :label="option.Name"
                         :key="option.Id">
              </el-option>
            </el-select>
          </div>
        </crud-form>
      </div>
    </div>
    <div v-else class="row">
      HOLA MUNDo
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import {Tooltip} from 'element-ui'
  import axios from 'axios'
  import FooterForm from '../../components/UIComponents/FooterForm'

  Vue.use(Tooltip)
  export default {
    components: {FooterForm},
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
      },
      ADGroupName: {
        get () {
          return this.$store.state.crud.formData.ADGroupName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'ADGroupName', val: value})
        }
      },
      ResourceId: {
        get () {
          return this.$store.state.crud.formData.ResourceId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'ResourceId', val: value})
        }
      }
    },
    data () {
      return {
        url: '/rol/',
        access: false,
        propsToSearch: ['Name', 'Level'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 35
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 100
          },
          {
            prop: 'Level',
            label: 'Nivel',
            minWidth: 35
          },
          {
            prop: 'ADGroupName',
            label: 'AD GroupName',
            minWidth: 110
          },
          {
            prop: 'Resource',
            label: 'Default Resource',
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
          Level: null,
          ADGroupName: null
        },
        values: []
      }
    },
    methods: {
      addAccess (index) {
        console.log(index)
        this.access = true
      },
      loadData () {
        axios.get('resource/')
          .then(response => {
            this.values = response.data
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      this.loadData()
    }
  }
</script>
<style>
</style>
