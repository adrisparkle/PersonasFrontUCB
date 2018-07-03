<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="card card-wizard" id="wizardCard">
          <form-wizard shape="tab"
                       @on-complete="wizardComplete"
                       error-color="#EB5E28"
                       color="#1c3b6c"
                       title="Distribucion de planillas por centros de costo"
                       subtitle="siga los siguientes pasos"
          >
            <h3 slot="subTitle">Distribucion de planillas por centros de costo</h3>
            <tab-content title="Planilla"
                         icon="fa fa-file-invoice-dollar">
              <file-uploader :url="payrollUrl"></file-uploader>
            </tab-content>

            <tab-content title="Academico"
                         :before-change="validateSecondStep"
                         icon="fa fa-graduation-cap">
              <file-uploader :url="acadUrl"></file-uploader>
            </tab-content>

            <tab-content title="Academico"
                         :before-change="validateSecondStep"
                         icon="fa fa-graduation-cap">
              <file-uploader :url="acadUrl"></file-uploader>
            </tab-content>

            <tab-content title="Last step"
                         icon="ti-check">
              <h2 class="text-center text-space">Yuhuuu!
                <br>
                <small>Click on "<b>Finish</b>" to join our community</small>
              </h2>
            </tab-content>

            <button slot="prev" class="btn btn-default btn-fill btn-wd btn-back">Back</button>
            <button slot="next" class="btn btn-info btn-fill btn-wd btn-next">Next</button>
            <button slot="finish" class="btn btn-info btn-fill btn-wd">Finish</button>
          </form-wizard>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import swal from 'sweetalert2'
  import FileUploader from 'src/components/UIComponents/FileUploader'

  export default {
    data () {
      return {
        wizardModel: {},
        payrollUrl: 'Payroll/UploadPayrollExcel',
        acadUrl: 'payroll/UploadAcademicExcel'
      }
    },
    components: {
      FormWizard,
      TabContent,
      FileUploader
    },
    methods: {
      validateSecondStep () {
        return this.$refs.secondStep.validate()
      },
      wizardComplete () {
        // we gather models from all steps into one model
        this.wizardModel = {
          ...this.$refs.firstStep.model,
          ...this.$refs.secondStep.model
        }
        swal('Good job!', 'You clicked the finish button!', 'success')
      }
    }
  }
</script>
<style>
  .vue-form-wizard .wizard-icon-circle.tab_shape {
    background-color: #9A9A9A !important;
    color: white;
  }
</style>
