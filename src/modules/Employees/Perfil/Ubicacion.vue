<template>
    <div class="container col-md-12">
        <template v-if="state==='LIST'">
          <template v-if="update && canEdit">
          <div class="panel panel-info  ">
            <div class="panel-body">
              <div class="row">
                <div class="form-group col-md-5">
                  <label>Dependencia</label>
                  <div>
                    <model-select class="select-info"
                                  :options="options"
                                  v-model="person.DependencyId"
                                  placeholder="Seleccione una Dependencia">
                    </model-select>
                  </div>
                </div>

                <div class="form-group col-md-3">
                  <label >Cargo</label>
                  <div >
                    <el-select class="select-info"
                               size="large"
                               placeholder="Seleccione Cargo"
                               v-model="person.PositionsId">
                      <el-option v-for="option in PositionSelect.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Cod +' - '+ option.Name"
                                 :key="option.Id">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="form-group col-md-3">
                  <label >Descripcion del Cargo</label>
                  <div >
                    <input type="text" placeholder="Descripcion del Cargo" class="form-control" v-model="person.PositionDescription">
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
                               v-model="person.Dedication">

                      <el-option v-for="option in selectDedication.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Name"
                                 :key="option.Id">
                      </el-option>

                    </el-select>
                  </div>
                </div>

                <div class="form-group col-md-3 col-md-offset-1">
                  <label>Vinculacion</label>
                  <div>
                    <el-select class="select-info"
                               size="large"
                               placeholder="Seleccione Vinculacion"
                               v-model="person.Linkage">
                      <el-option v-for="option in selectLinkage.values"
                                 class="select-danger"
                                 :value="option.Id"
                                 :label="option.Name"
                                 :key="option.Id">
                      </el-option>
                    </el-select>
                  </div>
                </div>

                <div class="form-group col-md-3 ">
                  <label>AI</label>
                  <div>
                    <input type="checkbox" placeholder="Nombres" class="form-control" v-model="person.AI">
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
                              v-model="person.StartDate">
                  </datepicker>
                </div>

                <div class="form-group col-md-4  col-md-offset-1">
                  <label>Fecha Fin</label>
                  <datepicker :typeable="false"
                              :bootstrap-styling="true"
                              :format="format" :language="es"
                              placeholder="Fecha Finalizacion"
                              v-model="person.EndDate">
                  </datepicker>
                </div>
              </div>
            </div>
            <button class="btn btn-danger" @click="update=false">Cancelar</button>
            <button class="btn btn-success pull-right" @click="Update()">Enviar</button>
          </div>
          </template>

          <template  v-else>

            <div class="panel panel-info ">
              <template v-if="canEdit">
                <button id="upda" class="btn circular pull-right" @click="update=(true && canEdit)">
                <span class="btn-label">
                  <i class="fa fa-user-edit"></i>
                </span>
                </button>
              </template>
              <div class="panel-body">
                <div class="row">
                  <div class="form-group col-md-5">
                    <label>Dependencia</label>
                    <div>
                      <input type="text" placeholder="Nombres" class="form-control" readonly v-model="person.Dependency">
                    </div>
                  </div>

                  <div class="form-group col-md-3">
                    <label>Cargo</label>
                    <div>
                      <input type="text" placeholder="Nombres" class="form-control" readonly v-model="person.Positions">
                    </div>
                  </div>

                  <div class="form-group col-md-3">
                    <label >Descripcion del Cargo</label>
                    <div>
                      <input type="text" placeholder="Descripcion del Cargo" class="form-control" readonly v-model="person.PositionDescription">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="form-group col-md-4">
                    <label>Dedicacion</label>
                    <div>
                      <input type="text" placeholder="Nombres" class="form-control" readonly v-model="person.Dedication">
                    </div>
                  </div>

                  <div class="form-group col-md-3 col-md-offset-1">
                    <label>Vinculacion</label>
                    <div>
                      <input type="text" placeholder="Nombres" class="form-control" readonly v-model="person.Linkagestr">
                    </div>
                  </div>

                  <div class="form-group col-md-3 ">
                    <label>Interinato?</label>
                    <div>
                      <input type="checkbox" placeholder="Nombres" class="form-control" disabled  v-model="person.AI">
                    </div>
                  </div>

                </div>

                <div class="row">
                  <div class="form-group col-md-4">
                    <label>Fecha Inicio</label>
                    <input type="text" placeholder="Nombres" class="form-control" readonly v-model="StartDateStr">
                  </div>

                  <div class="form-group col-md-4  col-md-offset-1">
                    <label>Fecha Fin</label>
                    <input type="text" placeholder="Nombres" class="form-control" readonly v-model="EndDateStr">
                  </div>
                </div>
              </div>
            </div>

          </template>
        </template>
        <template  v-if="state==='MOD' || action ==='ALTA'">
          <moveContract :person-id="personId" v-on:cancel="CancelMove()" v-on:refresh="$emit('refresh')"></moveContract>
        </template>
        <template  v-if="state==='BAJA'">
          <remove-contract :autofocus="'autofocus'" :person-id="personId" :contract-ids="ContractIds" v-on:cancel="CancelMove()" v-on:refresh="$emit('refresh')"></remove-contract>
        </template>

      <template v-if="state==='NOCONTRACT'">
        <br>
        <br>
        <H5 align="center">Esta Persona no se encuentra activa en este momento.</H5>
        <br>
        <br>
        <button class="btn btn-success pull-right btn-block" @click="Move()">Crear Nuevo Contrato</button>
      </template>

      <template v-if="state==='SELECTOPTION' && action !=='ALTA'">
        <br>
        <br>
        <H5 align="center">Por favor selecciona una opción.</H5>
        <br>
        <br>
      </template>
    </div>

</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'
  import { ModelSelect } from 'vue-search-select'
  import moveContract from './moveContract'
  import RemoveContract from './removeContract'
  import swal from 'sweetalert2'

  export default {
    props: {
      personId: {
        type: Number,
        required: true
      },
      ContractId: {
        type: Number,
        required: true
      },
      ContractIds: {
        type: Array,
        required: true
      },
      action: {
        type: String,
        default: ''
      }
    },
    computed: {
      StartDateStr: function () {
        let strArray = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        let d = new Date(this.person.StartDate)
        if (isNaN(d.getTime())) {
          return 'Sin Fecha'
        }
        let str = ('0' + d.getDate()).slice(-2) + '-' + (strArray[d.getMonth()]) + '-' + d.getFullYear()
        return str
      },
      EndDateStr: function () {
        let strArray = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
        let d = new Date(this.person.EndDate)
        if (isNaN(d.getTime())) {
          return 'Sin Fecha'
        }
        let str = ('0' + d.getDate()).slice(-2) + '-' + (strArray[d.getMonth()]) + '-' + d.getFullYear()
        return str
      },
      isremove: function () {
        return this.ContractIds.length > 0
      }
    },
    watch: {
      ContractId: function (newval, oldval) {
        this.init()
      },
      isremove: function (newval, oldval) {
        if (newval === true) {
          this.state = 'BAJA'
        }
      }
    },
    data () {
      return {
        person: null,
        canEdit: false,
        hasContract: false,
        state: 'SELECTOPTION',
        update: false,
        es: es,
        url: '/Contract',
        format: 'dd-MMM-yyyy',
        options: [],
        DepencencySelect: {
          select: '',
          values: []
        },
        PositionSelect: {
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
          values: []
        },
        formData: {
          UseSecondSurName: true,
          UseMariedSurName: false,
          CUNI: null,
          TypeDocument: null,
          Document: null,
          Ext: null,
          FirstSurName: null,
          SecondSurName: null,
          Names: null,
          MariedSurName: null,
          BirthDate: null,
          Gender: null,
          Nationality: null,
          NUA: null,
          AFP: null
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
      init () {
        if (this.ContractId === 0) {
          this.state = 'SELECTOPTION'
        } else {
          axios.get('contract/' + this.ContractId)
            .then(response => {
              this.person = response.data
              this.state = 'LIST'
              this.hasContract = true
            })
            .catch(this.hasContract = false)
        }
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
      loadLinkage () {
        axios.get('TableOfTables/Linkage/')
          .then(response => {
            this.selectLinkage.values = response.data
          })
          .catch(error => console.log(error))
      },
      Move: function () {
        this.state = 'MOD'
      },
      CancelMove: function () {
        if (this.hasContract) this.state = 'LIST'
        else this.state = 'SELECTOPTION'
      },
      checkPermisions: function () {
        let access = JSON.parse(localStorage.getItem('Menu'))
        let found = access.find(function (element) {
          return element.name === 'GPS'
        })
        let child = found.children.find(function (element) {
          return element.name === 'ABM'
        })
        this.canEdit = child.methods.includes('PUT')
      },
      Update: function () {
        let entorno = this
        this.$store.commit('crud/loadSetter', true)
        let contract = {
          StartDate: this.person.StartDate,
          EndDate: this.person.EndDate,
          Dedication: this.person.Dedication,
          DependencyId: this.person.DependencyId,
          PositionsId: this.person.PositionsId,
          PositionDescription: this.person.PositionDescription,
          Linkage: this.person.Linkage,
          AI: this.person.AI
        }
        axios.put(this.url + '/' + this.ContractId, contract, {
          headers: {
            'token': localStorage.getItem('token')
          }
        })
          .then(response => {
            console.log(response.data)
            entorno.CUNI = response.data.CUNI
            entorno.Document = response.data.Document
            entorno.Names = response.data.Names
            entorno.FirstSurName = response.data.FirstSurName
            entorno.SecondSurName = response.data.SecondSurName
            entorno.MariedSurName = response.data.MariedSurName
            entorno.UseMariedSurName = response.data.UseSecondSurName
            entorno.UseSecondSurName = response.data.UseSecondSurName
            entorno.$store.commit('crud/loadSetter', false)
            this.successMessage()
          })
          .catch(error => {
            console.log(error)
            this.errorMessage()
            entorno.$store.commit('crud/loadSetter', false)
          })
      }
    },
    created () {
      this.loadDependency()
      this.loadposition()
      this.loadLinkage()
      this.init()
      this.checkPermisions()
    },
    components: {
      RemoveContract,
      Datepicker,
      ModelSelect,
      moveContract
    }
  }
</script>

<style scoped>

</style>
