<template>
  <div>
    <br>
    <button type="button" class="btn btn-lg btn-fill btn-warning pull-right" v-on:click="$emit('Back')" >
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
  </div>
</template>

<script>
    import axios from 'axios'
    import Datepicker from 'vuejs-datepicker'
    import {es} from 'vuejs-datepicker/dist/locale'
    import { ModelSelect } from 'vue-search-select'

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
        }
      },
      data () {
        return {
          isModalVisible: false,
          // date picker ---
          es: es,
          format: 'dd-MMM-yyyy',
          urlAdd: '/Contract/Alta',
          valid: false,
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
          }
        }
      },
      methods: {
        showModal () {
          this.isModalVisible = true
        },
        closeModal () {
          this.isModalVisible = false
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
      created () {
        this.loadDependency()
        this.loadBranches()
        this.loadposition()
      },
      components: {
        Datepicker,
        ModelSelect
      }
    }
</script>

<style scoped>

</style>
