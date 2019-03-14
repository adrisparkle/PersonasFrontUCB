<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-wizard" id="wizardCard">
          <form-wizard shape="tab" ref="wizard"
                       @on-complete="wizardComplete"
                       error-color="#D32F2F"
                       color="#FFA000"
                       title="Distribucion por Centros de Responsabilidad"
                       subtitle="siga los siguientes pasos">
            <!-------------------------------------UPLOAD FILES------------------------------------------------->
            <tab-content title="CONFIG"
                         :before-change="validateFirstStep"
                         icon="fa fa-cogs">
              <div class="row">
                <div class="form-group col-md-3 el-col-offset-3 ">
                  <div class="row">
                    <label>Fecha de Alta:</label>
                  </div>
                  <div class="row">
                    <datepicker :typeable="false"
                                :bootstrap-styling="true"
                                :initialView="initialview"
                                :format="format" :language="es"
                                placeholder="Fecha de Alta"
                                v-model="formData.startDate">
                    </datepicker>
                      <small v-if="formError.startDate" class="form-text text-muted text-danger">*Por favor, selecciona una fecha</small>
                  </div>
                </div>
                <div class="form-group col-md-3 ">
                  <div class="row">
                    <label>Hasta:</label>
                  </div>
                  <div class="row">
                    <datepicker :typeable="false"
                                :bootstrap-styling="true"
                                :initialView="initialview"
                                :format="format" :language="es"
                                placeholder="Fecha de Alta"
                                v-model="formData.endDate">
                    </datepicker>
                    <small v-if="formError.endDate" class="form-text text-muted text-danger">*Por favor, selecciona una fecha</small>
                  </div>
                </div>
                <div class="form-group">
                  <label class="control-label">
                    Segmento
                  </label>
                  <br>
                  <el-select class="select-info"
                             size="large"
                             name="segmento"
                             placeholder="Regional"
                             v-model="formData.BranchesId">
                    <el-option v-for="option in selectBranches.values"
                               class="select-danger"
                               :value="option.Id"
                               :label="option.Name"
                               :key="option.Id">
                    </el-option>
                  </el-select>
                  <div>
                    <small v-if="formError.BranchesId" class="form-text text-muted text-danger">*Por favor, selecciona una regional</small>
                  </div>
                </div>
                <br>
                <div class="form-group col-md-6 el-col-offset-9">
                  <div class="row">
                    <label>Archivo de Altas:</label>
                  </div>
                  <div class="row">
                    <label class="btn btn-file-custom">
                      <i class="fa fa-file-upload" style="font-size: 35px;"></i>
                      <input type="file" id="file" ref="file" style="display: none;" v-on:change="handleFileUpload()"/>
                      <br>
                      {{fileName}}
                    </label>
                    <button v-if="formData.file!==null"
                            class="btn btn-simple btn-sm btn-icon btn-danger"
                            style="margin-bottom: -75px; margin-left: -30px"
                            @click="resetFile()">
                      <i class="fa fa-minus-circle" style="font-size: 30px;"></i>
                    </button>
                    <div>
                      <small v-if="formError.file" class="form-text text-muted text-danger">*Por favor, selecciona un archivo en formato .xlsx</small>
                    </div>
                  </div>
                </div>
              </div>
            </tab-content>
            <!-------------------------------------REVIEW AND SEND------------------------------------------------->
            <tab-content title="Revisar"
                         icon="fa fa-upload">

              <h5 class="text-center">PASO :2 Cargar el Archivo Planilla.</h5>

            </tab-content>

            <button slot="prev" class="btn btn-default btn-fill btn-wd btn-back">Atras</button>
            <button slot="next" class="btn btn-info btn-fill btn-wd btn-next">Siguiente</button>
            <button slot="finish" class="btn btn-warning btn-fill btn-wd">Finalizar</button>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable one-var */

  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import swal from 'sweetalert2'

  export default {
    data () {
      return {
        es: es,
        format: 'dd-MMM-yyyy',
        initialview: 'year',
        urlAdd: '/Contract/AltaExcel',
        file: null,
        formError: {
          file: false,
          startDate: false,
          endDate: false,
          BranchesId: false
        },
        formData: {
          file: null,
          startDate: null,
          endDate: null,
          BranchesId: null
        },
        selectBranches: {
          select: '',
          values: []
        }
      }
    },
    computed: {
      fileName: {
        get () {
          return this.formData.file === null ? 'Seleccione un Archivo' : this.formData.file.name
        }
      }
    },
    methods: {
      loadBranchData () {
        axios.get('branches/')
          .then(response => {
            this.selectBranches.values = response.data
          })
          .catch(error => console.log(error))
      },
      async validateFirstStep () {
        this.formError.startDate = this.formError.endDate = this.formError.file = this.formError.BranchesId = false
        let res = true
        if (this.formData.file === null) {
          this.formError.file = true
          res = false
        }
        if (this.formData.startDate === null) {
          this.formError.startDate = true
          res = false
        }
        if (this.formData.endDate === null) {
          this.formError.endDate = true
          res = false
        }
        if (this.formData.BranchesId === null) {
          this.formError.BranchesId = true
          res = false
        }
        let uf = await this.uploadFile()
        res = res && uf
        return res
      },
      wizardComplete () {
      },
      handleFileUpload () {
        // console.log('handelUpload')
        let ext = this.$refs.file.files[0].name.split('.').pop()
        if (ext !== 'xlsx') {
          this.formError.file = true
        } else {
          this.formError.file = false
          this.formData.file = this.$refs.file.files[0]
        }
      },
      resetFile () {
        this.file = null
        this.formData.file = null
        const input = this.$refs.file
        input.type = 'text'
        input.type = 'file'
      },
      formatDate (date) {
        let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear()
        if (month.length < 2) {
          month = '0' + month
        }
        if (day.length < 2) {
          day = '0' + day
        }
        return [year, month, day].join('-')
      },
      uploadFile () {
        this.$store.commit('crud/loadSetter', true)
        let formData1 = new FormData()
        formData1.append('file', this.formData.file)
        formData1.append('BranchesId', this.formData.BranchesId)
        formData1.append('startDate', this.formatDate(this.formData.startDate))
        formData1.append('endDate', this.formatDate(this.formData.endDate))
        return axios.post('/ContractAltaExcel', formData1, {
          responseType: 'arraybuffer',
          headers: {
            'token': localStorage.getItem('token')
          }
        }).then(response => {
          this.$store.commit('crud/loadSetter', false)
          console.log(response)
          return true
        })
          .catch(error => {
            // console.log(error.response.data)
            if (error.response.status === 400) {
              this.$refs.file.value = ''
              this.$store.commit('crud/loadSetter', false)
              const errors = JSON.parse(error.response.headers.uploaderrors)
              let e = ''
              for (const key in errors) {
                e += errors[key] + '<br>'
              }
              const blob = new Blob([error.response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              })
              const url = window.URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.href = url
              var filename = error.response.request.getResponseHeader('Content-Disposition')
              link.setAttribute('download', filename.split('filename=')[1])
              document.body.appendChild(link)
              link.click()
              swal({
                title: 'ERROR',
                html: e,
                type: 'error',
                confirmButtonClass: 'btn btn-info btn-fill',
                buttonsStyling: false
              })
            }
            return false
          })
      }
    },
    components: {
      FormWizard,
      TabContent,
      Datepicker
    },
    created () {
      this.loadBranchData()
    }
  }
</script>

<style>
  .vue-form-wizard .wizard-icon-circle.tab_shape {
    width: 100%;
    min-width: 100px;
    height: 40px;
    border: none;
    background-color: #1c3b6c;
    color: #fff;
    border-radius: 0;
  }
  .stepTitle{
    color: #1c3b6c;
  }
  .btn-file-custom input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    width: 400%;
    min-width: 100%;
    min-height: 100%;
    font-size: 100px;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    background: white;
    cursor: inherit;
    display: block;
  }
</style>
