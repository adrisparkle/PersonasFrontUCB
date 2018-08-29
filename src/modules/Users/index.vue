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
          <label>Nombre de Usuario</label>
          <input type="text" placeholder="Nombre" class="form-control" v-model="UserPrincipalName">
        </div>
        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="CUNI"
                     v-model="PeopleId">
            <el-option v-for="option in values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.CUNI"
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
      UserPrincipalName: {
        get () {
          return this.$store.state.crud.formData.UserPrincipalName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'UserPrincipalName', val: value})
        }
      },
      PeopleId: {
        get () {
          return this.$store.state.crud.formData.PeopleId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'PeopleId', val: value})
        }
      }
    },
    data () {
      return {
        url: '/user',
        propsToSearch: ['UserPrincipalName', 'person'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'UserPrincipalName',
            label: 'Usuario',
            minWidth: 100
          },
          {
            prop: 'person',
            label: 'Empleado',
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
          UserPrincipalName: null
        }
      }
    },
    methods: {
      loadData () {
        axios.get('people/')
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
