<template>
  <div class="row">
    <div class="col-md-12 card">
      <div class="panel panel-info">
        <div class="panel-heading">
          Datos del socio de Negocio:
        </div>
        <div class="panel-body">
          <div class="row">
            <div class="col-md-4 col-md-offset-2">
              <div class="form-group row">
                <label>Codigo SAP:</label>
                <div>
                <input type="text" placeholder="Codigo SAP" class="form-control" v-model="formData.SAPId" @keyup.enter="findBP()" @change="ResetForm()">
                </div>
              </div>
            </div>

            <div class="col-md-4 col-md-offset-2" style="margin-left: 0">
              <button class="btn btn-fill btn-success btn-block"  id="search-person" @click="findBP()" style="margin-top: 25px;">Buscar</button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-2 col-md-offset-2">
              <div class="form-group row">
                <label>CUNI</label>
                <div>
                  <input type="text" placeholder="CUNI" class="form-control" v-model="contract.CUNI" @change="ResetPerson()" :readonly="readonly">
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import swal from 'sweetalert2'

  export default {

    computed: {
    },
    data () {
      return {
        url: '/civil/',
        formData: {
          FullName: null,
          SAPId: null,
          NIT: null,
          Document: null
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
      findBP: function () {
        axios.get('civil/findInSAP/' + this.formData.SAPId)
          .then(response => {
            this.formData.FullName = response.data.FullName
            this.formData.SAPId = response.data.SAPId
            this.formData.NIT = response.data.NIT
            this.formData.Document = response.data.Document
          })
          .catch(error => {
            if (error.response.status === 404) {
              this.errorMessage('No se encontró el Socio de Negocio en SAP')
            }
            if (error.response.status === 401) {
              this.errorMessage('Su usuario no tiene permisos para usar este socio de negocio')
            }
          })
      },
      ResetForm: function () {
        this.formData.FullName = null
        this.formData.SAPId = null
        this.formData.NIT = null
        this.formData.Document = null
      }
    }
  }
</script>
<style>
</style>
