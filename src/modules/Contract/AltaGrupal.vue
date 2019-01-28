<template>
  <div class="row">
    <div class="el-col-md-offset-7 col-md-5 form-group">
      <label>Fotocopia Carnet Identidad</label>
      <label class="btn  btn-file-custom">
        <i class="fa fa-file-upload" style="font-size: 35px;"></i>
        <input type="file" id="file" ref="file" style="display: none;" v-on:change="handleFileUpload()"/>
        <br>
        {{fileName}}
      </label>
      <button v-if="file!==null"
              class="btn btn-simple btn-sm btn-icon btn-danger"
              style="margin-bottom: -75px; margin-left: -30px"
              @click="resetFile()">
        <i class="fa fa-minus-circle" style="font-size: 30px;"></i>
      </button>
      <small v-if="formError.file" class="form-text text-muted text-danger">*Por favor, selecciona un archivo (jpg ó png)</small>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import {es} from 'vuejs-datepicker/dist/locale'
  export default {
    data () {
      return {
        es: es,
        format: 'dd-MMM-yyyy',
        initialview: 'year',
        urlAdd: '/Contract/AltaExcel'
      }
    }
  }
</script>

<style scoped>

</style>
