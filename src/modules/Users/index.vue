<template>
  <div class="row">
    <div class="col-md-8 card">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="props.handleEdit(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <div class="col-md-4">
      <crud-form v-bind="{url,formData}">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" class="form-control" v-model="UserName">
        </div>
        <div class="form-group" v-if="!this.$store.state.crud.edit">
          <label>Password</label>
          <input type="text" placeholder="Password" class="form-control" v-model="Password">
        </div>
        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Rol"
                     v-model="RolId">
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
</template>
<script>
  import axios from 'axios'
  export default {
    computed: {
      UserName: {
        get () {
          return this.$store.state.crud.formData.UserName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'UserName', val: value})
        }
      },
      Password: {
        get () {
          return this.$store.state.crud.formData.Password
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Password', val: value})
        }
      },
      RolId: {
        get () {
          return this.$store.state.crud.formData.RolId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'RolId', val: value})
        }
      }
    },
    data () {
      return {
        url: '/user',
        propsToSearch: ['Name', 'Level'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'UserName',
            label: 'Usuario',
            minWidth: 100
          },
          {
            prop: 'Rol',
            label: 'Rol',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        select: '',
        values: [],
        formData: {
          UserName: null,
          Password: null,
          RolId: ''
        }
      }
    },
    methods: {
      loadData () {
        axios.get('rol/')
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
