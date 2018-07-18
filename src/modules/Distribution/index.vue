<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-wizard" id="wizardCard">
          <form-wizard shape="tab"
                       @on-complete="wizardComplete"
                       error-color="#D32F2F"
                       color="#FFA000"
                       title="Distribucion de planillas por centros de costo"
                       subtitle="siga los siguientes pasos">
            <tab-content title="CONFIG"
                         :before-change="validateFirstStep"
                         icon="fa fa-cogs">
              <first-step ref="firstStep"></first-step>
            </tab-content>
            <tab-content title="Planilla"
                         icon="fa fa-file-invoice-dollar">
              <h5 class="text-center">PASO :2 Subir el Archivo Planilla.</h5>
              <file-uploader :url="payrollUrl" fileType="PLANILLA"></file-uploader>
            </tab-content>
            <tab-content title="Paralelos"
                         :before-change="validateFirstStep"
                         icon="fa fa-graduation-cap">
              <h5 class="text-center">PASO :3 Subir el Archivo Paralelo.</h5>
              <file-uploader :url="acadUrl" fileType="PARALELO"></file-uploader>
            </tab-content>
            <tab-content title="Pregrado"
                         :before-change="validateFirstStep"
                         icon="fa fa-graduation-cap">
              <h5 class="text-center">PASO :4 Subir el Archivo Planilla.</h5>
              <file-uploader :url="PreUrl" fileType="PREGRADO"></file-uploader>
            </tab-content>
            <tab-content title="Posgrado"
                         :before-change="validateFirstStep"
                         icon="fa fa-graduation-cap">
              <h5 class="text-center">PASO :5 Subir el Archivo Planilla.</h5>
              <file-uploader :url="PosUrl" fileType="POSTGRADO"></file-uploader>
            </tab-content>
            <tab-content title="Otras Regionales"
                         :before-change="validateFirstStep"
                         icon="fa fa-graduation-cap">
              <h5 class="text-center">PASO :6 Subir el Archivo Planilla.</h5>
              <file-uploader :url="ORUrl" fileType="OTRA REGIONAL"></file-uploader>
            </tab-content>
            <tab-content title="Descuentos"
                         :before-change="validateFirstStep"
                         icon="fa fa-graduation-cap">
              <h5 class="text-center">PASO :7 Subir el Archivo Planilla.</h5>
              <file-uploader :url="desUrl" fileType="DESCUENTO"></file-uploader>
            </tab-content>
            <tab-content title="Distribución"
                         icon="ti-check">
              <h2 class="text-center text-space">Yuhuuu!
                <br>
                <small>Click on "<b>Finish</b>" to join our community</small>
              </h2>
            </tab-content>

            <button slot="prev" class="btn btn-default btn-fill btn-wd btn-back">Atras</button>
            <button slot="next" class="btn btn-info btn-fill btn-wd btn-next">Siguiente</button>
            <button slot="finish"  class="btn btn-warning btn-fill btn-wd">Distribuir</button>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import FirstStep from './Steps/FirstStep.vue'
  import swal from 'sweetalert2'
  import FileUploader from 'src/components/UIComponents/FileUploader'

  export default {
    data () {
      return {
        wizardModel: {},
        payrollUrl: 'Payroll/PayrollExcel',
        acadUrl: 'Payroll/AcademicExcel',
        PreUrl: 'Payroll/pregradoExcel',
        PosUrl: 'Payroll/PostgradoExcel',
        ORUrl: 'Payroll/OrExcel',
        desUrl: 'Payroll/discountExcel',
        disableButton: true
      }
    },
    components: {
      FormWizard,
      TabContent,
      FirstStep,
      FileUploader
    },
    methods: {
      validateFirstStep () {
        return this.$refs.firstStep.validate()
      },
      wizardComplete () {
        // we gather models from all steps into one model
        this.wizardModel = {
          ...this.$refs.firstStep.model
        }
        swal('Good job!', 'You clicked the finish button!', 'success')
      }
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
</style>

