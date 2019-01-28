<template>
  <div class="panel panel-info" id="scrollhere">
    <div class="panel-body">
      <div class="row" v-if="hasContracts">
        <div class="form-group col-md-3">
          <label>Reemplazar cargo actual?</label>
          <div>
            <el-select class="select-info"
                       size="large"
                       placeholder="Seleccione Opcion"
                       v-model="replace">
              <el-option class="select-danger"
                         value= true
                         label="Reemplazar cargo Actual">
              </el-option>

              <el-option class="select-danger"
                         value= false
                         label="Crear actividad Paralela">
              </el-option>
            </el-select>
            <small v-if="formError.replace" class="form-text text-muted text-danger">*Selecciona un valor.</small>
          </div>
        </div>
        <template v-if="replace==='true'">
          <div class="form-group col-md-4">
            <label >Cargo Antiguo</label>
            <div >
              <el-select class="select-info"
                         size="large"
                         placeholder="Seleccione Cargo"
                         v-model="OldCotractsSelect.select">
                <el-option v-for="option in OldCotractsSelect.values"
                           class="select-danger"
                           :value="option.Id"
                           :label="option.Positions +' en '+ option.Cod +'-'+ option.Dependency"
                           :key="option.Id">
                </el-option>
              </el-select>
              <small v-if="formError.OldCotractsSelect" class="form-text text-muted text-danger">*Selecciona un valor.</small>
            </div>
          </div>
          <div class="form-group col-md-3">
            <label >Motivo del movimiento</label>
            <div >
              <el-select class="select-info"
                         size="large"
                         placeholder="Seleccione Motivo"
                         v-model="motivoCambio.select">
                <el-option v-for="option in motivoCambio.values"
                           class="select-danger"
                           :value="option.Id"
                           :label="option.Name"
                           :key="option.Id">
                </el-option>
              </el-select>
              <small v-if="formError.motivoCambio" class="form-text text-muted text-danger">*Selecciona un valor.</small>
            </div>
          </div>
        </template>
      </div>
      <div class="row">
        <div class="form-group col-md-5">
          <label>Dependencia</label>
          <div>
            <model-select class="select-info"
                          :options="options"
                          v-model="contract.DependencyId"
                          placeholder="Seleccione una Dependencia">
            </model-select>
            <small v-if="formError.DependencyId" class="form-text text-muted text-danger">*Selecciona un valor.</small>
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
            <small v-if="formError.PositionsId" class="form-text text-muted text-danger">*Selecciona un valor.</small>
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
            <small v-if="formError.Dedication" class="form-text text-muted text-danger">*Selecciona un valor.</small>
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
            <small v-if="formError.Linkage" class="form-text text-muted text-danger">*Selecciona un valor.</small>
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
          <small v-if="formError.StartDate" class="form-text text-muted text-danger">*Selecciona una fecha.</small>
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
          <small v-if="formError.EndDate" class="form-text text-muted text-danger">*Selecciona una fecha.</small>
        </div>
      </div>
    </div>
    <button class="btn btn-danger" @click="clearData()">Cancelar</button>
    <button class="btn btn-success pull-right" @click="send()">Enviar</button>
  </div>
</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'
  import { ModelSelect } from 'vue-search-select'
  import swal from 'sweetalert2'

  export default {
    props: {
      personId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        formError: {
          StartDate: false,
          replace: false,
          EndDate: false,
          Dedication: false,
          DependencyId: false,
          PositionsId: false,
          PeopleId: false,
          PositionDescription: false,
          Linkage: false,
          AI: false,
          motivoCambio: false,
          OldCotractsSelect: false
        },
        contract: {
          StartDate: null,
          EndDate: null,
          Dedication: null,
          DependencyId: null,
          PositionsId: null,
          PeopleId: null,
          PositionDescription: null,
          Linkage: null,
          AI: false
        },
        url: '/Contract/GetPersonHistory',
        es: es,
        format: 'dd-MMM-yyyy',
        initialview: 'year',
        options: [],
        replace: null,
        DepencencySelect: {
          select: '',
          values: []
        },
        PositionSelect: {
          select: null,
          values: []
        },
        OldCotractsSelect: {
          select: null,
          values: []
        },
        selectDedication: {
          select: null,
          values: [{Id: 'MT', Name: 'Medio Tiempo'},
            {Id: 'TC', Name: 'Tiempo Completo'},
            {Id: 'TH', Name: 'Tiempo Horario'}]
        },
        motivoCambio: {
          select: null,
          values: []
        },
        selectLinkage: {
          select: null,
          values: [{Id: 'PERSONAL PERMANENTE', Name: 'Personal Permanente'},
            {Id: 'PERSONAL PLAZO FIJO', Name: 'Personal a Plazo Fijo'},
            {Id: 'TIEMPO HORARIO', Name: 'Tiempo Horario'}]
        }
      }
    },
    watch: {
      possitionWath: function (newval, oldval) {
        if (newval === 26) {
          this.contract.Linkage = 3
          this.contract.Dedication = 'TH'
        }
      }
    },
    methods: {
      autoFocus () {
        document.getElementById('scrollhere').scrollIntoView()
      },
      history: function () {
        axios.get('/Contract/GetPersonHistory/' + this.personId + '?all=false')
          .then(response => {
            this.OldCotractsSelect.values = response.data
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
      loadposition () {
        axios.get('positions/')
          .then(response => {
            this.PositionSelect.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadCause () {
        axios.get('/CauseOfMovement/Movement', {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            this.motivoCambio.values = response.data
          })
          .catch(error => console.log(error))
      },
      isEmptyBlanckOrNull: function (val) {
        return !val || val.length === 0 || !val.toString().trim()
      },
      valid: function () {
        let x = true
        this.formError.replace = this.isEmptyBlanckOrNull(this.replace)
        if (this.replace === 'true' && (this.isEmptyBlanckOrNull(this.motivoCambio.select) || this.isEmptyBlanckOrNull(this.OldCotractsSelect.select) || this.isEmptyBlanckOrNull(this.contract.StartDate))) {
          this.formError.motivoCambio = this.isEmptyBlanckOrNull(this.motivoCambio.select)
          this.formError.OldCotractsSelect = this.isEmptyBlanckOrNull(this.OldCotractsSelect.select)
          x = false
        }
        this.formError.Dedication = this.isEmptyBlanckOrNull(this.contract.Dedication)
        this.formError.Linkage = this.isEmptyBlanckOrNull(this.contract.Linkage)
        this.formError.StartDate = this.isEmptyBlanckOrNull(this.contract.StartDate)
        this.formError.EndDate = this.showEndDate && this.isEmptyBlanckOrNull(this.contract.EndDate)
        this.formError.DependencyId = this.isEmptyBlanckOrNull(this.contract.DependencyId)
        this.formError.PositionsId = this.isEmptyBlanckOrNull(this.contract.PositionsId)
        x = !(!x || this.formError.Dedication || this.formError.Linkage || this.formError.StartDate || this.formError.EndDate || this.formError.DependencyId || this.formError.PositionsId)
        return x
      },
      send: function () {
        this.$store.commit('crud/loadSetter', true)
        let entorno = this
        if (this.valid() && this.replace === 'true') {
          let fin = {
            EndDate: this.NewEndDate,
            Cause: this.motivoCambio.select
          }
          this.contract.PeopleId = this.personId
          axios.post('/Contract/Baja/' + this.OldCotractsSelect.select, fin, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
            .then(response => {
              axios.post('/Contract/Alta/', this.contract, {
                headers: {
                  'token': localStorage.getItem('token')
                }
              })
                .then(response => {
                  entorno.clearData()
                  entorno.$emit('refresh')
                  entorno.successMessage()
                  entorno.$store.commit('crud/loadSetter', false)
                })
                .catch(error => {
                  console.log(error)
                  entorno.errorMessage(error.response.data)
                  entorno.$store.commit('crud/loadSetter', false)
                })
            })
            .catch(error => {
              console.log(error)
              entorno.errorMessage(error.response.data)
              entorno.$store.commit('crud/loadSetter', false)
            })
        } else if (this.valid()) {
          this.contract.PeopleId = this.personId
          axios.post('/Contract/Alta/', this.contract, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
            .then(response => {
              entorno.clearData()
              entorno.$emit('refresh')
              entorno.successMessage()
              console.log(response.data)
              entorno.$store.commit('crud/loadSetter', false)
            })
            .catch(error => {
              console.log(error)
              entorno.errorMessage(error.response.data)
              entorno.$store.commit('crud/loadSetter', false)
            })
        }
        this.$store.commit('crud/loadSetter', false)
      },
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
      clearData: function () {
        this.contract.StartDate = null
        this.contract.EndDate = null
        this.contract.Dedication = null
        this.contract.DependencyId = null
        this.contract.PositionsId = null
        this.contract.PeopleId = null
        this.contract.PositionDescription = null
        this.contract.Linkage = null
        this.contract.AI = false
      }
    },
    created () {
      this.loadDependency()
      this.loadLinkage()
      this.loadposition()
      this.history()
      this.loadCause()
    },
    mounted () {
      this.autoFocus()
    },
    computed: {
      showEndDate: {
        get () {
          return this.contract.Linkage != null && (this.contract.Linkage === 2 || this.contract.Linkage === 3)
        }
      },
      hasContracts: {
        get () {
          return this.OldCotractsSelect.values.length > 0
        }
      },
      NewEndDate: {
        get () {
          return new Date(this.contract.StartDate - 86400 * 1000)
        }
      },
      possitionWath: {
        get () {
          return this.contract.PositionsId
        }
      }
    },
    components: {
      Datepicker,
      ModelSelect
    }
  }
</script>

<style scoped>

</style>
