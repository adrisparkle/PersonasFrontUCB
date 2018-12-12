<template>
  <div class="panel panel-info">
    <div class="panel-body">
      <div class="row" v-if="hasContracts">
        <div class="form-group col-md-3">
          <label>Reemplazar cargo actual?</label>
          <div>
            <input type="checkbox" class="form-control" v-model="replace">
          </div>
        </div>
        <template v-if="replace">
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
          <label>AI</label>
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

        <div class="form-group col-md-4  col-md-offset-1">
          <label>Fecha Fin</label>
          <datepicker :typeable="false"
                      :bootstrap-styling="true"
                      :format="format" :language="es"
                      placeholder="Fecha Finalizacion"
                      v-model="contract.EndDate">
          </datepicker>
        </div>
      </div>
    </div>
    <button class="btn btn-danger" @click="$emit('cancel')">Cancelar</button>
    <button class="btn btn-success pull-right" @click="send()">Enviar</button>
  </div>
</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'
  import { ModelSelect } from 'vue-search-select'

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
        options: [],
        replace: false,
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
          values: [{Id: 'PERMANENTE', Name: 'Personal Permanente'},
            {Id: 'PLAZO FIJO', Name: 'Personal a Plazo Fijo'},
            {Id: 'TIEMPO HORARIO', Name: 'Tiempo Horario'}]
        }
      }
    },
    watch: {
      possitionWath: function (newval, oldval) {
        console.log('pos')
        if (newval === 26) {
          console.log('TH')
          this.contract.Linkage = 'TIEMPO HORARIO'
          this.contract.Dedication = 'TH'
        }
      }
    },
    methods: {
      history: function () {
        axios.get('/Contract/GetPersonHistory/' + this.personId + '?all=false')
          .then(response => {
            this.OldCotractsSelect.values = response.data
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
            console.log(response.data)
            this.motivoCambio.values = response.data
          })
          .catch(error => console.log(error))
      },
      valid: function () {
        let x = true
        if (this.replace && (this.motivoCambio.select == null || this.OldCotractsSelect.select == null || this.contract.StartDate == null || this.contract.StartDate === '')) {
          this.formError.motivoCambio = (this.motivoCambio.select === null)
          this.formError.OldCotractsSelect = (this.OldCotractsSelect.select === null)
          x = false
        }
        this.formError.Dedication = (this.contract.Dedication === null)
        this.formError.Linkage = (this.contract.Linkage === null)
        this.formError.StartDate = (this.contract.StartDate === null)
        this.formError.DependencyId = (this.contract.DependencyId === null)
        this.formError.PositionsId = (this.contract.PositionsId === null)
        x = !(!x || this.formError.Dedication || this.formError.Linkage || this.formError.StartDate || this.formError.DependencyId || this.formError.PositionsId)
        return x
      },
      send: function () {
        if (this.valid() && this.replace) {
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
                  console.log(response.data)
                })
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        } else if (this.valid()) {
          this.contract.PeopleId = this.personId
          axios.post('/Contract/Alta/', this.contract, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
            .then(response => {
              console.log(response.data)
            })
            .catch(error => console.log(error))
        }
      }
    },
    created () {
      this.loadDependency()
      this.loadposition()
      this.history()
      this.loadCause()
    },
    computed: {
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
