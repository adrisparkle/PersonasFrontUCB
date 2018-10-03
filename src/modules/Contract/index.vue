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
        <crud-form v-bind="{url: urlRemove,formData: formDataRemove ,valid,tittle:'Desvincular a:',alert:true}" @validate="Validate">
          <div class="panel panel-info">
            <div class="panel-heading">
              Datos de la Persona
            </div>
            <div class="panel-body">
              <div class="row">
                <center>
                  <h3> {{FullName}} <small>(ci: {{Document}})</small></h3>
                  <h4>{{Positions}} de {{Dependency}}</h4>
                </center>
              </div>
            </div>
          </div>
          <div class="panel panel-info">
            <div class="panel-heading">
              Información de la Desvinculación
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="form-group col-md-4">
                  <label>Motivo de la Desvinculación</label>
                  <div>
                    <el-select class="select-info"
                               size="large"
                               placeholder="Seleccione Motivo"
                               v-model="Cause">

                      <el-option v-for="option in selectMotivoBaja.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Name"
                                 :key="option.Id">
                      </el-option>

                    </el-select>
                  </div>
                </div>
                <div class="form-group col-md-6">
                  <label>Fecha Fin</label>
                  <datepicker :typeable="false"
                              :bootstrap-styling="true"
                              :format="format" :language="es"
                              placeholder="Fecha Finalizacion"
                              v-model="EndDate">
                  </datepicker>
                </div>
              </div>
            </div>
          </div>
        </crud-form>
      </template>
<!-- ++++++++++++++++++++++++++++++++     CREATE     +++++++++++++++++++++++++++++++++++++++++-->
      <template v-if="actions==='CREATE'">
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

        <crud-form v-bind="{url: urlAdd,formData,valid,tittle:'Nueva Ubicación'}" @validate="Validate">
          <div class="panel panel-info">
            <div class="panel-heading">
              Datos de la Persona
            </div>
            <div class="panel-body">
              <div class="col-md-12">
                <div class="form-group row">
                  <label>CUNI</label>
                  <div>
                    <input type="text" placeholder="CUNI" class="form-control" v-model="CUNI">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel panel-info">
            <div class="panel-heading">
              Ubicacion
            </div>
            <div class="panel-body">
              <div class="row">
                <div class="form-group col-md-4">
                  <label>Dependencia</label>
                  <div>
                    <model-select class="select-info"
                                  :options="options"
                                  v-model="DependencyId"
                                  placeholder="Seleccione una Dependencia">
                    </model-select>
                  </div>
                </div>

                <div class="form-group col-md-4">
                  <label >Cargo</label>
                  <div >
                    <el-select class="select-info"
                               size="large"
                               placeholder="Seleccione Cargo"
                               v-model="PositionsId">
                      <el-option v-for="option in PositionSelect.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Cod +' - '+ option.Name"
                                 :key="option.Id">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="form-group col-md-4">
                  <label >Descripcion del Cargo</label>
                  <div >
                    <input type="text" placeholder="Descripcion del Cargo" class="form-control" v-model="PositionDescription">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="form-group col-md-4">
                  <label>Dedicacion</label>
                  <div>
                    <el-select class="select-info"
                               size="large"
                               placeholder="Seleccione Dedicacion"
                               v-model="Dedication">

                      <el-option v-for="option in selectDedication.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Name"
                                 :key="option.Id">
                      </el-option>

                    </el-select>
                  </div>
                </div>

                <div class="form-group col-md-4">
                  <label>Vinculacion</label>
                  <div>
                    <el-select class="select-info"
                               size="large"
                               placeholder="Seleccione Vinculacion"
                               v-model="Linkage">
                      <el-option v-for="option in selectLinkage.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Name"
                                 :key="option.Id">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="form-group col-md-4">
                  <label>Regional</label>
                  <div>
                    <el-select class="select-info"
                               size="large"
                               placeholder="Seleccione Regional"
                               v-model="BranchesId">
                      <el-option v-for="option in BranchesSelect.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Name"
                                 :key="option.Id">
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="form-group col-md-6">
                  <label>Fecha Inicio</label>
                  <datepicker :typeable="false"
                              :bootstrap-styling="true"
                              :format="format" :language="es"
                              placeholder="Fecha Inicio"
                              v-model="StartDate">
                  </datepicker>
                </div>

                <div class="form-group col-md-6">
                  <label>Fecha Fin</label>
                  <datepicker :typeable="false"
                              :bootstrap-styling="true"
                              :format="format" :language="es"
                              placeholder="Fecha Finalizacion"
                              v-model="EndDate">
                  </datepicker>
                </div>
              </div>
            </div>
          </div>


        </crud-form>

      </template>
    </div>


  </div>
</template>
<script>
  import Vue from 'vue'
  import {Tooltip} from 'element-ui'
  import axios from 'axios'
  import { ModelSelect } from 'vue-search-select'
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'
  import swal from 'sweetalert2'


  Vue.use(Tooltip)
  export default {
    computed: {
      CUNI: {
        get () {
          return this.$store.state.crud.formData.CUNI
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'CUNI', val: value})
        }
      },
      DependencyId: {
        get () {
          return this.$store.state.crud.formData.DependencyId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'DependencyId', val: value})
        }
      },
      PositionsId: {
        get () {
          return this.$store.state.crud.formData.PositionsId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'PositionsId', val: value})
        }
      },
      PositionDescription: {
        get () {
          return this.$store.state.crud.formData.PositionDescription
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'PositionDescription', val: value})
        }
      },
      Dedication: {
        get () {
          return this.$store.state.crud.formData.Dedication
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Dedication', val: value})
        }
      },
      Linkage: {
        get () {
          return this.$store.state.crud.formData.Linkage
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Linkage', val: value})
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
      StartDate: {
        get () {
          return this.$store.state.crud.formData.StartDate
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'StartDate', val: (value.getMonth() + 1) + '-' + value.getDate() + '-' + value.getFullYear()})
        }
      },
      EndDate: {
        get () {
          return this.$store.state.crud.formData.EndDate
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'EndDate', val: (value.getMonth() + 1) + '-' + value.getDate() + '-' + value.getFullYear()})
        }
      },
      Cause: {
        get () {
          return this.$store.state.crud.formData.Cause
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Cause', val: value})
        }
      },
      FullName: {
        get () {
          return this.$store.state.crud.formData.FullName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'FullName', val: value})
        }
      },
      Document: {
        get () {
          return this.$store.state.crud.formData.Document
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Document', val: value})
        }
      },
      Dependency: {
        get () {
          return this.$store.state.crud.formData.Dependency
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Dependency', val: value})
        }
      },
      Positions: {
        get () {
          return this.$store.state.crud.formData.Positions
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Positions', val: value})
        }
      }
    },
    data () {
      return {
        // date picker ---
        es: es,
        format: 'dd-MMM-yyyy',
        // --- end date picker
        actions: 'LIST',
        url: '/Contract/',
        urlAdd: '/Contract/Alta',
        urlRemove: '/Contract/Baja',
        valid: false,
        propsToSearch: ['FullName', 'CUNI', 'Document', 'Dependency', 'Branches'],
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
        },
        formData: {
          CUNI: null,
          DependencyId: null,
          PositionsId: '',
          PositionDescription: '',
          Dedication: '',
          Linkage: '',
          BranchesId: '',
          StartDate: '',
          EndDate: ''
        },
        formDataRemove: {
          Cause: null,
          FullName: null,
          CUNI: null,
          Document: '',
          EndDate: '',
          Dependency: '',
          Positions: ''
        },
        DepencencySelect: {
          select: '',
          values: []
        },
        options: [],
        PositionSelect: {
          select: '',
          values: []
        },
        BranchesSelect: {
          select: '',
          values: []
        },
        selectDedication: {
          select: '',
          values: [{Id: 'MT', Name: 'Medio Tiempo'},
            {Id: 'TC', Name: 'Tiempo Completo'},
            {Id: 'TH', Name: 'Tiempo Horario'}]
        },
        selectLinkage: {
          select: '',
          values: [{Id: 'PERMANENTE', Name: 'Personal Permanente'},
            {Id: 'PLAZO FIJO', Name: 'Personal a Plazo Fijo'},
            {Id: 'TIEMPO HORARIO', Name: 'Tiempo Horario'}]
        },
        selectMotivoBaja: {
          select: '',
          values: [{Id: 'FIN CONTRATO', Name: 'Fin de Contrato'},
            {Id: 'RENUNCIA', Name: 'Renuncia'},
            {Id: 'JUBILACION', Name: 'Jubilación'},
            {Id: 'DESTITUCION', Name: 'Destitución'},
            {Id: 'FIN DESIGNACION', Name: 'Fin Designación'},
            {Id: 'MUERTE', Name: 'Muerte'}]
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
              let baseurl = '/Contract/Baja/'
              this.actions = 'REMOVE'
              this.urlRemove = baseurl + index
              axios.get('/Contract/' + index, {
                headers: {
                  'token': localStorage.getItem('token')
                }
              })
                .then(response => {
                  console.log(response.data)
                  this.FullName = response.data.FullName
                  this.CUNI = response.data.CUNI
                  this.Document = response.data.Document
                  this.Positions = response.data.Positions
                  this.Dependency = response.data.Dependency
                })
                .catch(error => console.log(error))
            } else {
              this.actions = 'LIST'
            }
          })
      },
      Create () {
        this.actions = 'CREATE'
        this.loadDependency()
        this.loadBranches()
        this.loadposition()
      },
      Back () {
        this.actions = 'LIST'
      },
      loadDependency () {
        let op = this.options
        axios.get('dependency/')
          .then(response => {
            response.data.forEach(function (element) {
              // console.log(element)
              op.push({value: element.Id, text: element.Cod + '-' + element.Name})
            })
          })
          .catch(error => console.log(error))
      },
      loadBranches () {
        axios.get('branches/')
          .then(response => {
            this.BranchesSelect.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadposition () {
        axios.get('positions/')
          .then(response => {
            this.PositionSelect.values = response.data
          })
          .catch(error => console.log(error))
      },
      Validate () {
        this.valid = true
      }
    },
    components: {
      ModelSelect,
      Datepicker
    }
  }
</script>
<style>
</style>
