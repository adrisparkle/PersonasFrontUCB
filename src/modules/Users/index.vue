<template>
<div>
  <div class="row" v-if="!branch && !rol">
    <div class="col-md-8 card">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="props.handleEdit(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Añadir Regional" placement="top-start">
            <a class="btn btn-simple btn-xs btn-success btn-icon"  @click="addBranch(props.queriedData[props.index].Id)"><i class="fa fa-plus"></i></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Añadir Rol" placement="top-start">
            <a class="btn btn-simple btn-xs btn-success btn-icon"  @click="addRol(props.queriedData[props.index].Id)"><i class="fa fa-key"></i></a>
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
  <template v-if="branch">
    <h3>Accesos del Usuario: <small>{{username}}</small>
      <button type="button" class="btn btn-wd btn-fill btn-info" style="margin: 0 auto" @click="EndBranch">
          <span class="btn-label">
              <i class="fa fa-file-excel" ></i>
                 Finalizar
          </span>
      </button>
    </h3>
    <div class="col-md-8 card">
      <data-tables v-bind="{url: url1, propsToSearch: propsToSearch1,tableColumns: tableColumns1}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="removeBranch(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <div class="col-md-4">
      <crud-form v-bind="{url: url1,formData: formData1}">
        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Regional"
                     v-model="BranchesId">
            <el-option v-for="option in values1"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>
      </crud-form>
    </div>

  </template>




  <template v-if="rol">
    <h3>Roles del Usuario: <small>{{username}}</small>
      <button type="button" class="btn btn-wd btn-fill btn-info" style="margin: 0 auto" @click="EndRol">
          <span class="btn-label">
              <i class="fa fa-arrow" ></i>
                 Finalizar
          </span>
      </button>
    </h3>
    <div class="col-md-8 card">
      <data-tables v-bind="{url: url2, propsToSearch: propsToSearch2,tableColumns: tableColumns2}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="removeRol(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <div class="col-md-4">
      <crud-form v-bind="{url: url2,formData: formData2}">
        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Rol"
                     v-model="RolId">
            <el-option v-for="option in values2"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>
      </crud-form>
    </div>

  </template>

</div>
</template>
<script>
  import axios from 'axios'
  import swal from 'sweetalert2'

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
      },
      BranchesId: {
        get () {
          return this.$store.state.crud.formData.BranchesId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'BranchesId', val: value})
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
        // Branches add/ remove
        branch: false,
        rol: false,
        username: '',
        formData1: {
          BranchesId: null
        },
        formData2: {
          RolId: null
        },
        baseurl: 'user/Branches/',
        baseurl2: 'user/Rol/',
        url1: '',
        url2: '',
        propsToSearch1: ['Method', 'Description', 'Path'],
        propsToSearch2: ['Name'],
        tableColumns1: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 35
          },
          {
            prop: 'Abr',
            label: 'Abreviacion',
            minWidth: 50
          },
          {
            prop: 'Name',
            label: 'Regional',
            minWidth: 100
          }
        ],
        tableColumns2: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 35
          },
          {
            prop: 'Name',
            label: 'Rol',
            minWidth: 50
          }
        ],
        values1: [],
        values2: [],
        // user
        url: '/user',
        propsToSearch: ['UserPrincipalName', 'person'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 30
          },
          {
            prop: 'UserPrincipalName',
            label: 'Usuario',
            minWidth: 130
          },
          {
            prop: 'person',
            label: 'Empleado',
            minWidth: 220
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
      },
      addBranch (index) {
        this.branch = true
        this.url1 = this.baseurl + index
        this.username = index
      },
      EndBranch () {
        this.branch = false
      },
      loadBranchesData () {
        axios.get('branches/')
          .then(response => {
            this.values1 = response.data
          })
          .catch(error => console.log(error))
      },
      removeBranch (index) {
        var acurl = this.url1
        swal({
          title: 'Estas Seguro?',
          text: 'No será posible volver atras!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, borrar!',
          cancelButtonText: 'No, cancelar',
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          buttonsStyling: false
        }).then(function () {
          axios.delete(acurl, {params: {
            'BranchesId': index
          }},
            {
              headers: {
                'token': localStorage.getItem('token')
              }
            })
            .then(response => {
              swal({
                title: 'Eliminado!',
                text: 'Se elimino de forma correcta.',
                type: 'success',
                confirmButtonClass: 'btn btn-success btn-fill',
                buttonsStyling: false
              })
              this.$store.commit('crud/loadData', this.formData1.url)
              // dispatch('loadData', formData.url)
            })
            .catch(error => console.log(error))
        }, function (dismiss) {
          // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
          if (dismiss === 'cancel') {
            swal({
              title: 'Cancelado',
              text: 'Este item está a salvo :)',
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
          }
        })
      },
      //  Rol stuff
      addRol (index) {
        this.rol = true
        this.url2 = this.baseurl2 + index
        this.username = index
        this.loadRolsData()
      },
      EndRol () {
        this.rol = false
      },
      loadRolsData () {
        axios.get('rol/')
          .then(response => {
            this.values2 = response.data
          })
          .catch(error => console.log(error))
      },
      removeRol (index) {
        var acurl = this.url2
        swal({
          title: 'Estas Seguro?',
          text: 'No será posible volver atras!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, borrar!',
          cancelButtonText: 'No, cancelar',
          confirmButtonClass: 'btn btn-success btn-fill',
          cancelButtonClass: 'btn btn-danger btn-fill',
          buttonsStyling: false
        }).then(function () {
          axios.delete(acurl, {params: {
            'RolId': index
          }},
            {
              headers: {
                'token': localStorage.getItem('token')
              }
            })
            .then(response => {
              swal({
                title: 'Eliminado!',
                text: 'Se elimino de forma correcta.',
                type: 'success',
                confirmButtonClass: 'btn btn-success btn-fill',
                buttonsStyling: false
              })
              this.$store.commit('crud/loadData', this.formData1.url)
              // dispatch('loadData', formData.url)
            })
            .catch(error => console.log(error))
        }, function (dismiss) {
          // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
          if (dismiss === 'cancel') {
            swal({
              title: 'Cancelado',
              text: 'Este item está a salvo :)',
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
          }
        })
      }
    },
    created () {
      this.loadData()
      this.loadBranchesData()
    }
  }
</script>
<style>
</style>
