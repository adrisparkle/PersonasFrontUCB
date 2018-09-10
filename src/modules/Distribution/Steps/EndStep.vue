<template>
  <div class="row">
    <div class="col-md-12" style="text-align:center">
      <data-tables v-if="this.$store.state.dist.uploadedFiles.state==='WARNING' || this.$store.state.dist.uploadedFiles.state==='ERROR'"  v-bind="{url, propsToSearch, tableColumns,actions}">
      </data-tables>
      <el-table v-if="this.$store.state.dist.uploadedFiles.state==='VALIDATED'" class="table-striped" :data="tableData">
        <el-table-column label="Columna" property="name"></el-table-column>
        <el-table-column label="Monto" property="total"></el-table-column>
      </el-table>
      <button  v-if="this.$store.state.dist.uploadedFiles.state==='STARTED'"  type="button" class="btn btn-wd btn-fill btn-success" style="margin-top: 25px; margin-left: 10px" @click="validate">
        <span class="btn-label">
            <i class="fa fa-check"></i>
               VALIDAR ARCHIVOS
        </span>
      </button>
      <button  v-if="this.$store.state.dist.uploadedFiles.state==='VALIDATED'" type="button" class="btn btn-wd btn-fill btn-success" style="margin-top: 25px; margin-left: 10px" @click="process">
        <span class="btn-label">
            <i class="fa fa-check"></i>
               PROCESAR ARCHIVOS
        </span>
      </button>
      <button v-if="this.$store.state.dist.uploadedFiles.state==='WARNING'" type="button" class="btn btn-wd btn-fill btn-warning" style="margin-top: 25px; margin-left: 10px" @click="ignore">
        <span class="btn-label">
            <i class="fa fa-exclamation-circle"></i>
               IGNORAR ADVERTENCIAS
        </span>
      </button>
      <button v-if="this.$store.state.dist.uploadedFiles.state!='PROCESSED'" type="button" class="btn btn-wd btn-fill btn-danger" style="margin-top: 25px; margin-left: 10px" @click="cancel">
        <span class="btn-label">
            <i class="fa fa-times"></i>
               CANCELAR
        </span>
      </button>
      <div v-if="this.$store.state.dist.uploadedFiles.state==='PROCESSED'">
        <div class="sa-success" style="margin: 0 auto">
          <div class="sa-success-tip"></div>
          <div class="sa-success-long"></div>
          <div class="sa-success-placeholder"></div>
          <div class="sa-success-fix"></div>
        </div>
      </div>
      <br><br>
      <template v-if="this.$store.state.dist.uploadedFiles.state==='PROCESSED' || this.$store.state.dist.uploadedFiles.state==='INSAP'">

        <button type="button" class="btn btn-wd btn-fill btn-info" style="margin: 0 auto" @click="TotalGeneral">
          <span class="btn-label">
              <i class="fa fa-file-excel" ></i>
                 Total General
          </span>
        </button>
        <button type="button" class="btn btn-wd btn-fill btn-info" style="margin: 0 auto" @click="TotalCuenta">
          <span class="btn-label">
              <i class="fa fa-file-excel" ></i>
                 Total por Cuenta
          </span>
        </button>

        <button  type="button" class="btn btn-wd btn-fill btn-info" style="margin: 0 auto" @click="comprobante">
          <span class="btn-label">
              <i class="fa fa-file-excel" ></i>
                 Descargar Detalle
          </span>
        </button>
      </template>
      <br><br>
      <template v-if="this.$store.state.dist.uploadedFiles.state==='PROCESSED'">
        <input type="checkbox" id="checkbox" v-model="checked"> He verificado los datos de la distribución
        <br><br>
        <button v-if="checked" type="button" class="btn btn-wd btn-fill btn-success" style="margin: 0 auto" @click="SAPVoucher">
          <span class="btn-label">
              <i class="fa fa-file-excel" ></i>
                 Contabilizar en SAP
          </span>
        </button>
      </template>

    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        checked: false,
        url: '/Payroll/Geterrors/' + this.$store.state.dist.uploadedFiles.id,
        state: this.$store.state.dist.uploadedFiles.state,
        propsToSearch: [ 'CUNI', 'Name', 'Type' ],
        tableColumns: [
          {
            prop: 'CUNI',
            label: 'CUNI',
            minWidth: 40
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 60
          },
          {
            prop: 'Description',
            label: 'Descripción',
            minWidth: 100
          },
          {
            prop: 'Archivos',
            label: 'Archivos',
            minWidth: 60
          },
          {
            prop: 'Type',
            label: 'Tipo',
            minWidth: 20
          }
        ],
        actions: false,
        tableData: []
      }
    },
    methods: {
      validate () {
        axios.get('/payroll/validate/' + this.$store.state.dist.uploadedFiles.id)
        .then(response => {
          this.$store.dispatch('dist/uploadedFiles')
          this.$store.dispatch('crud/loadData', '/Payroll/Geterrors/' + this.$store.state.dist.uploadedFiles.id)
          this.loadTotales()
        })
        .catch(error => console.log(error))
      },
      ignore () {
        axios.get('/payroll/acceptwarnings/' + this.$store.state.dist.uploadedFiles.id)
          .then(response => {
            this.$store.dispatch('dist/uploadedFiles')
            this.loadTotales()
          })
          .catch(error => console.log(error))
      },
      comprobante () {
        axios.get('/payroll/getdistribution/' + this.$store.state.dist.uploadedFiles.id,
          {
            responseType: 'arraybuffer'
          }
        )
          .then(response => {
            const blob = new Blob([response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            var filename = response.request.getResponseHeader('Content-Disposition')
            link.setAttribute('download', filename.split('filename=')[1])
            document.body.appendChild(link)
            link.click()
          })
          .catch(error => console.log(error))
      },
      TotalGeneral () {
        axios.get('/payroll/GetTotalGeneral/' + this.$store.state.dist.uploadedFiles.id,
          {
            responseType: 'arraybuffer'
          }
        )
          .then(response => {
            const blob = new Blob([response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            var filename = response.request.getResponseHeader('Content-Disposition')
            link.setAttribute('download', filename.split('filename=')[1])
            document.body.appendChild(link)
            link.click()
          })
          .catch(error => console.log(error))
      },
      TotalCuenta () {
        axios.get('/payroll/GetTotalCuenta/' + this.$store.state.dist.uploadedFiles.id,
          {
            responseType: 'arraybuffer'
          }
        )
          .then(response => {
            const blob = new Blob([response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            var filename = response.request.getResponseHeader('Content-Disposition')
            link.setAttribute('download', filename.split('filename=')[1])
            document.body.appendChild(link)
            link.click()
          })
          .catch(error => console.log(error))
      },
      SAPVoucher () {
        axios.get('/payroll/GetSAPResume/' + this.$store.state.dist.uploadedFiles.id,
          {
            responseType: 'arraybuffer'
          }
        )
          .then(response => {
            const blob = new Blob([response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            var filename = response.request.getResponseHeader('Content-Disposition')
            link.setAttribute('download', filename.split('filename=')[1])
            document.body.appendChild(link)
            link.click()
          })
          .catch(error => console.log(error))
      },
      process () {
        axios.get('/payroll/distribute/' + this.$store.state.dist.uploadedFiles.id)
        .then(response => {
          this.$store.dispatch('dist/uploadedFiles')
        })
        .catch(error => console.log(error))
      },
      loadTotales () {
        axios.get('/payroll/sumtotalesplanilla/' + this.$store.state.dist.uploadedFiles.id)
          .then(response => {
            this.tableData = response.data
          })
          .catch(error => console.log(error))
      },
      cancel () {
        axios.delete('/payroll/process/' + this.$store.state.dist.uploadedFiles.id)
          .then(response => {
            this.$store.dispatch('dist/uploadedFiles')
          })
          .catch(error => console.log(error))
      }
    }
  }

</script>
<style scoped>
  .row{
    display: block;
    clear: both;
    margin: 0 auto;
    width: 100%;
  }
</style>
