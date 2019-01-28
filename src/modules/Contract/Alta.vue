<template>
  <div>
    <DetailEmpleado v-if="redirectToPersonDetail" action="ALTA" :index="i"></DetailEmpleado>
    <template v-else>

      <template>


        <div class="panel panel-info">
          <div class="panel-heading">
            Datos de la Persona
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-4 col-md-offset-2">
                <div class="form-group row">
                  <label>Documento Identidad</label>
                  <div>
                    <input type="text" placeholder="Documento Identidad" class="form-control" v-model="contract.Document" @change="ResetPerson()">
                    <small v-if="formError.Document.active" class="form-text text-muted text-danger">{{formError.Document.message}}</small>
                  </div>
                </div>
              </div>

              <div class="col-md-4 col-md-offset-2" style="margin-left: 0">
                <button class="btn btn-fill btn-success btn-block"  id="search-person" @click="searchPerson(contract.Document)" style="margin-top: 25px;">Buscar</button>
              </div>
            </div>
            <div class="row">
              <div class="col-md-2 col-md-offset-2">
                <div class="form-group row">
                  <label>CUNI</label>
                  <div>
                    <input type="text" placeholder="CUNI" class="form-control" v-model="contract.CUNI" @change="ResetPerson()" :readonly="readonly">
                    <small v-if="formError.CUNI.active" class="form-text text-muted text-danger">{{formError.CUNI.message}}</small>
                  </div>
                </div>
              </div>

              <div class="col-md-5 col-md-offset-1">
                <div class="form-group row">
                  <label>Nombre Completo</label>
                  <div>
                    <input type="text" placeholder="Nombre Completo" class="form-control" v-model="FullName" @change="ResetPerson()"  :readonly="readonly">
                  </div>
                </div>
              </div>


            </div>

            <AltaEmpleado v-if="showModal" :showModal="showModal" :document="contract.Document" @close="showModal = false" @personcreated="searchPerson">
            </AltaEmpleado>
          </div>
        </div>


        <template v-if="reinOrNew">

          <div class="panel panel-info">
            <div class="panel-heading">
              Ubicación
            </div>
            <div class="panel-body">

              <div class="row">
                <div class="form-group col-md-5">
                  <label>Dependencia</label>
                  <div>
                    <model-select class="select-info"
                                  :options="options"
                                  v-model="contract.DependencyId"
                                  placeholder="Seleccione una Dependencia">
                    </model-select>
                    <small v-if="formError.DependencyId.active" class="form-text text-muted text-danger">{{formError.DependencyId.message}}</small>
                  </div>
                </div>

                <div class="form-group col-md-3">
                  <label >Cargo</label>
                  <div >
                    <el-select class="select-info"
                               size="large"
                               placeholder="Seleccione Cargo"
                               v-model="contract.PositionsId">
                      <el-option v-for="option in PositionSelect.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Cod +' - '+ option.Name"
                                 :key="option.Id">
                      </el-option>
                    </el-select>
                    <small v-if="formError.PositionsId.active" class="form-text text-muted text-danger">{{formError.PositionsId.message}}</small>
                  </div>
                </div>

                <div class="form-group col-md-3">
                  <label >Descripcion del Cargo</label>
                  <div >
                    <input type="text" placeholder="Descripcion del Cargo" class="form-control" v-model="contract.PositionDescription">
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
                               v-model="contract.Dedication">

                      <el-option v-for="option in selectDedication.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Name"
                                 :key="option.Id">
                      </el-option>

                    </el-select>
                    <small v-if="formError.Dedication.active" class="form-text text-muted text-danger">{{formError.Dedication.message}}</small>
                  </div>
                </div>

                <div class="form-group col-md-3 col-md-offset-1">
                  <label>Vinculacion</label>
                  <div>
                    <el-select class="select-info"
                               size="large"
                               placeholder="Seleccione Vinculacion"
                               v-model="contract.Linkage">
                      <el-option v-for="option in selectLinkage.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Name"
                                 :key="option.Id">
                      </el-option>
                    </el-select>
                    <small v-if="formError.Linkage.active" class="form-text text-muted text-danger">{{formError.Linkage.message}}</small>
                  </div>
                </div>

                <div class="form-group col-md-3 ">
                  <label>Interinato?</label>
                  <div>
                    <input type="checkbox" placeholder="Nombres" class="form-control" v-model="contract.AI">
                  </div>
                </div>

              </div>

              <div class="row">
                <div class="form-group col-md-4">
                  <label>Fecha Inicio</label>
                  <datepicker :typeable="false"
                              :bootstrap-styling="true"
                              :format="format" :language="es"
                              placeholder="Fecha Inicio"
                              v-model="contract.StartDate">
                  </datepicker>
                  <small v-if="formError.StartDate.active" class="form-text text-muted text-danger">{{formError.StartDate.message}}</small>
                </div>

                <div v-if="showEndDate" class="form-group col-md-4  col-md-offset-1">
                  <label>Fecha Fin</label>
                  <datepicker :typeable="false"
                              :bootstrap-styling="true"
                              :format="format" :language="es"
                              :initialView="initialview"
                              placeholder="Fecha Finalizacion"
                              v-model="contract.EndDate">
                  </datepicker>
                  <small v-if="formError.EndDate.active" class="form-text text-muted text-danger">{{formError.EndDate.message}}</small>
                </div>
              </div>
            </div>

            <button class="btn btn-success btn-block" @click="send()">Guardar</button>

          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
    import axios from 'axios'
    import Datepicker from 'vuejs-datepicker'
    import {es} from 'vuejs-datepicker/dist/locale'
    import { ModelSelect } from 'vue-search-select'
    import EditableTable from '../../components/UIComponents/EditableTable'
    import AltaExcel from './AltaExcel'
    import AltaEmpleado from './AltaEmpleado'
    import DetailEmpleado from '../Employees/DetailEmpleado'
    import swal from 'sweetalert2'


    export default {
      watch: {
        possitionWath: function (newval, oldval) {
          if (newval === 26) {
            this.contract.Linkage = 3
            this.contract.Dedication = 'TH'
          }
        }
      },
      data () {
        return {
          reinOrNew: false,
          i: 0,
          redirectToPersonDetail: false,
          showModal: false,
          columns: [],
          rows: [],
          ExcelUpload: false,
          // date picker ---
          es: es,
          format: 'dd-MMM-yyyy',
          initialview: 'year',
          urlAdd: '/Contract/Alta',
          // stetic
          FullName: '',
          readonly: true,
          // end stetic
          contract: {
            Document: null,
            DependencyId: null,
            PositionsId: null,
            PositionDescription: null,
            Dedication: null,
            Linkage: null,
            StartDate: null,
            EndDate: null,
            AI: false,
            CUNI: null
          },
          formError: {
            Document: {
              active: false,
              message: '*Este valor no puede ser vacio.'
            },
            DependencyId: {
              active: false,
              message: '*Por favor selecciona un valor.'
            },
            AI: {
              active: false,
              message: '*Por favor selecciona un valor.'
            },
            PositionsId: {
              active: false,
              message: '*Por favor selecciona un valor.'
            },
            PositionDescription: {
              active: false,
              message: ''
            },
            Dedication: {
              active: false,
              message: '*Por favor selecciona un valor.'
            },
            Linkage: {
              active: false,
              message: '*Por favor selecciona un valor.'
            },
            StartDate: {
              active: false,
              message: '*Por favor selecciona una fecha.'
            },
            EndDate: {
              active: false,
              message: '*Por favor selecciona una fecha menor a la fecha de inicio.'
            },
            CUNI: {
              active: false,
              message: '*Por favor busca una persona.'
            }
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
            values: [{Id: 'PERSONAL PERMANENTE', Name: 'Personal Permanente'},
              {Id: 'PERSONAL PLAZO FIJO', Name: 'Personal a Plazo Fijo'},
              {Id: 'TIEMPO HORARIO', Name: 'Tiempo Horario'}]
          }
        }
      },
      computed: {
        showEndDate: {
          get () {
            return this.contract.Linkage != null && (this.contract.Linkage === 2 || this.contract.Linkage === 3)
          }
        },
        possitionWath: {
          get () {
            return this.contract.PositionsId
          }
        }
      },
      methods: {
        successMessage: function () {
          swal({
            title: `Buen trabajo!`,
            text: 'Se guardaron los cambios!',
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            type: 'success'
          })
        },
        errorMessage: function (text) {
          swal({
            title: `Ups!`,
            text: 'Ocurrio un error!\n' + text,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-success btn-fill',
            type: 'error'
          })
        },
        isEmptyBlanckOrNull: function (val) {
          return !val || val.length === 0 || !val.toString().trim()
        },
        valid: function () {
          let x = true
          this.formError.Document.active = this.isEmptyBlanckOrNull(this.contract.Document)
          this.formError.DependencyId.active = this.isEmptyBlanckOrNull(this.contract.DependencyId)
          this.formError.PositionsId.active = this.isEmptyBlanckOrNull(this.contract.PositionsId)
          this.formError.Dedication.active = this.isEmptyBlanckOrNull(this.contract.Dedication)
          this.formError.Linkage.active = this.isEmptyBlanckOrNull(this.contract.Linkage)
          this.formError.StartDate.active = this.isEmptyBlanckOrNull(this.contract.StartDate)
          this.formError.EndDate.active = this.showEndDate && this.isEmptyBlanckOrNull(this.contract.StartDate) || Date.parse(this.contract.EndDate) < Date.parse(this.contract.StartDate)
          if (Date.parse(this.contract.EndDate) < Date.parse(this.contract.StartDate)) {
            this.formError.EndDate.message = '*Esta fecha no puede ser menor a la fecha Inicio'
          }
          this.formError.CUNI.active = this.isEmptyBlanckOrNull(this.contract.CUNI)
          x = !(!x || this.formError.Document.active ||
            this.formError.DependencyId.active ||
            this.formError.PositionsId.active ||
            this.formError.Dedication.active ||
            this.formError.Linkage.active ||
            this.formError.StartDate.active ||
            this.formError.EndDate.active ||
            this.formError.CUNI.active)
          return x
        },
        send () {
          this.$store.commit('crud/loadSetter', true)
          let entorno = this
          console.log('post')
          if (this.valid()) {
            console.log('post axios')
            axios.post('/Contract/Alta', this.contract, {
              headers: {
                'token': localStorage.getItem('token')
              }
            })
              .then(response => {
                // handle success
                console.log(response.data)
                entorno.contract.Id = response.data.Id
                entorno.contract.CUNI = response.data.CUNI
                entorno.$store.commit('crud/loadSetter', false)
                entorno.successMessage()
                entorno.clearFormData()
              })
              .catch(error => {
                // handle error
                console.log(error)
                entorno.$store.commit('crud/loadSetter', false)
                entorno.errorMessage(error.response.data.Message)
              })
          } else {
            this.$store.commit('crud/loadSetter', false)
          }
        },
        ResetPerson  () {
          this.$store.commit('crud/formDataFieldSetter', {field: 'CUNI', val: null})
          this.FullName = null
        },
        clearFormData  () {
          this.contract.Document = null
          this.contract.DependencyId = null
          this.contract.PositionsId = null
          this.contract.PositionDescription = null
          this.contract.Dedication = null
          this.contract.Linkage = null
          this.contract.StartDate = null
          this.contract.EndDate = null
          this.contract.CUNI = null
          this.FullName = null
        },
        searchPerson (doc) {
          doc = this.cleanText(doc)
          console.log(doc)
          this.contract.Document = this.cleanText(this.contract.Document)
          axios.get('people/query?by=Documento&value=' + doc)
            .then(response => {
              this.contract.CUNI = response.data.CUNI
              this.FullName = response.data.FullName
              this.i = response.data.Id
              this.redirectToPersonDetail = response.data.contract
              this.reinOrNew = !this.redirectToPersonDetail
            })
            .catch(error => {
              if (error.response.status === 404) {
                this.showModal = true
              }
            })
        },
        cleanText (text) {
          return text.split(' ').join('').toUpperCase()
        },
        showExcelUpload () {
          this.ExcelUpload = true
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
        loadLinkage () {
          axios.get('TableOfTables/Linkage/')
            .then(response => {
              this.selectLinkage.values = response.data
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
        }
      },
      created () {
        this.loadDependency()
        this.loadBranches()
        this.loadLinkage()
        this.loadposition()
      },
      components: {
        AltaExcel,
        EditableTable,
        Datepicker,
        ModelSelect,
        AltaEmpleado,
        DetailEmpleado
      }
    }
</script>

<style scoped>

</style>
