<template>
  <div class="row">
    <div class="col-md-12 card" v-if="!create">
      <div class="btn-group">
        <button type="button" class="btn btn-lg btn-fill btn-warning" @click="createPeople">
          <span class="btn-label">
            <i class="fa fa-plus"></i>
          </span>
          Nuevo Empleado
        </button>
        <button type="button" class="btn btn-lg btn-fill btn-success">
          <span class="btn-label">
            <i class="fa fa-file-excel"></i>
          </span>
          Importar Excel
        </button>
      </div>
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="props.handleEdit(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <div class="col-md-12 card" v-else>
      <crud-form v-bind="{url,formData}">
        <div class="el-col-md-24">
          <!----------------------- Type Document ----------------------------->
          <div class="form-group el-col-md-9" style="padding-top: 50px; margin-left: -20px">
            <div class="el-col-md-8 text-right" style="font-size: 20px; ">
              Tipo Documento
            </div>
            <div class="el-col-offset-2 el-col-md-13" style="padding-top: 7px;">
              <el-select class="select-info"
                         size="large"
                         placeholder="Tipo Documento"
                         v-model="TypeDocument">
                <el-option v-for="option in selectDocumentType.values"
                           class="select-danger"
                           :value="option.Id"
                           :label="option.Name"
                           :key="option.Id">
                </el-option>
              </el-select>
            </div>
          </div>
          <!----------------------- Document ----------------------------->
          <div class="form-group el-col-md-8" style="padding-top: 50px; margin-left: -30px">
            <div class="el-col-md-11 text-right">
              <span style="font-size: 20px;">Numero Documento</span>
            </div>
            <div class="el-col-offset-1 el-col-md-12" style="padding-top: 8px;">
              <input type="text" placeholder="Documento de identidad" class="form-control" v-model="Document">
            </div>
          </div>
          <!----------------------- Issued ----------------------------->
          <template v-if="TypeDocument==='CI'">
            <div class="form-group el-col-md-8" style="padding-top: 50px; margin-left: -10px">
              <div class="el-col-md-8 text-right" style="font-size: 20px; ">
                Expedido en
              </div>
              <div class="el-col-offset-2 el-col-md-13" style="padding-top: 7px;">
                <el-select class="select-info"
                           size="large"
                           placeholder="Expedido en"
                           v-model="Ext">
                  <el-option v-for="option in selectIssued.values"
                             class="select-danger"
                             :value="option.Id"
                             :label="option.Name"
                             :key="option.Id">
                  </el-option>
                </el-select>
              </div>
            </div>
          </template>
          <hr style="border: 0;
                    clear:both;
                    display:block;
                    width: 96%;
                    background-color:#a5a5a4;
                    height: 1px;">
          <!----------------------- Display Name ----------------------------->
          <div class="el-col-24"><span style="font-size: 30px;">{{fullName}}</span></div>
          <!----------------------- Names ----------------------------->
          <div style="padding-top: 10px;" class="el-col-md-24">
            <div class="el-col-md-3 text-right">
              <span style="font-size: 20px;">Nombres</span>
            </div>
            <div class="el-col-offset-1 el-col-md-20">
              <input type="text" placeholder="Nombres" class="form-control" v-model="Names">
            </div>
          </div>

          <!--start 3rd line-->
          <div class="el-col-md-24" style="padding-top: 30px;">
          <!----------------------- FirstSurName ----------------------------->
            <div class="el-col-md-3 text-right" style="font-size: 20px;">
              Primer Apellido
            </div>
            <div class="el-col-offset-1 el-col-md-7" style="padding-top: 9px;">
              <input type="text" placeholder="Primer Apellido" class="form-control" v-model="FirstSurName">
            </div>

          <!----------------------- SecondSurName ----------------------------->
            <template v-if="UseSecondSurName">
              <div class="el-col-md-2 text-right" style="font-size: 20px; padding-left: 10px">
                Segundo Apellido
              </div>
              <div class="el-col-offset-1 el-col-md-7" style="padding-top: 9px;">
                <input type="text" placeholder="Segundo Apellido" class="form-control" v-model="SecondSurName">
              </div>
            </template>
          <div class="el-col-md-3 form-check" style="margin-top: -10px; margin-bottom: 30px; padding-left: 10px">
            <label>
              <small>¿Usa Segundo Apellido?</small>
            </label>
            <br>
            <input type="checkbox" class="el-checkbox__input" style="margin-left: 30px;" v-model="UseSecondSurName">
          </div>
        <!--start 3rd line-->
        </div>
          <!----------------------- MariedSurName ----------------------------->
          <template v-if="Gender==='F'">
            <div class="el-col-md-24" style="margin-bottom: 20px">
              <template v-if="UseMariedSurName">
                <div class="el-col-md-3 text-right" style="font-size: 20px;">
                  Apellido Casada
                </div>
                <div class="el-col-offset-1 el-col-md-7" style="padding-top: 9px;">
                  <input type="text" placeholder="Apellido de Casada" class="form-control" v-model="MariedSurName">
                </div>
              </template>
            <div class="el-col-md-3 form-check" style="margin-top: -15px; padding-left: 10px">
              <label>
                <small>¿Usa Apellido de Casada?</small>
              </label>
              <br>
              <input type="checkbox" class="el-checkbox__input" style="margin-left: 30px;" v-model="UseMariedSurName">
            </div>
            </div>
          </template>

          <hr style="border: 0;
                    clear:both;
                    display:block;
                    width: 96%;
                    background-color:#a5a5a4;
                    height: 1px;">
          <!----------------------- Gender ----------------------------->
          <div class="form-group el-col-md-12" style="padding-top: 15px;">
            <div class="el-col-md-6 text-right" style="font-size: 20px;">
              Genero
            </div>
            <div class="el-col-offset-2 el-col-md-12">
              <el-select class="select-info"
                         size="large"
                         placeholder="Genero"
                         v-model="Gender">
                <el-option v-for="option in selectGender.values"
                           class="select-danger"
                           :value="option.Id"
                           :label="option.Name"
                           :key="option.Id">
                </el-option>
              </el-select>
            </div>
          </div>

          <!----------------------- BirthDate ----------------------------->
          <div class="form-group el-col-md-10" style="padding-top: 15px;">
            <div class="el-col-md-7 text-right" style="font-size: 20px;">
              Fecha de Nacimiento
            </div>
            <div class="el-col-offset-3 el-col-md-13">
              <datepicker :typeable="false"
                          :bootstrap-styling="true"
                          :initialView="initialview"
                          :format="format" :language="es"
                          placeholder="Fecha de Nacimiento"
                          :open-date="opendate"
                          v-model="BirthDate">
              </datepicker>
            </div>
          </div>
          <!----------------------- Nationality ----------------------------->
          <div class="form-group el-col-md-24" style="padding-top: 1px;">
            <div class="el-col-md-3 text-right" style="font-size: 20px; margin-left: -25px">
              Nacionalidad
            </div>
            <div class="el-col-offset-1" style="margin-left: 60px">
              <el-select class="select-info"
                         size="large"
                         placeholder="Nacionalidad"
                         v-model="Nationality">
                <el-option v-for="option in selectNationality.values"
                           class="select-danger"
                           :value="option.Id"
                           :label="option.Name"
                           :key="option.Id">
                </el-option>
              </el-select>
            </div>
          </div>
          <hr style="border: 0;
                    clear:both;
                    display:block;
                    width: 96%;
                    background-color:#a5a5a4;
                    height: 1px;">
          <div class="form-group el-col-md-24" style="padding-top: 15px;">
            <div class="form-group el-col-md-12">
              <div class="el-col-md-6 text-right" style="font-size: 20px;">
                AFP
              </div>
              <div class="el-col-offset-2 el-col-md-11" >
                <el-select class="select-info"
                           size="large"
                           placeholder="AFP"
                           v-model="AFP">
                  <el-option v-for="option in selectAFP.values"
                             class="select-danger"
                             :value="option.Id"
                             :label="option.Name"
                             :key="option.Id">
                  </el-option>
                </el-select>
              </div>
            </div>
            <div class="el-col-md-3 text-right" style="font-size: 20px;">
              NUA
            </div>
            <div class="el-col-offset-1 el-col-md-7" >
              <input type="text" placeholder="NUA" class="form-control" v-model="NUA">
            </div>

          </div>
        </div>
      </crud-form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import {en, es} from 'vuejs-datepicker/dist/locale'

  export default {
    components: {Datepicker},
    computed: {
      fullName: function () {
        let fn = this.formData.Names != null ? this.formData.Names : ''
        if (this.formData.FirstSurName != null) {
          fn += ' ' + this.formData.FirstSurName
        }
        if (this.formData.UseSecondSurName && this.formData.SecondSurName != null) {
          fn += ' ' + this.formData.SecondSurName
        }
        if (this.formData.UseMariedSurName && this.formData.MariedSurName != null) {
          fn += ' ' + this.formData.MariedSurName
        }
        return fn.toUpperCase()
      },
      CUNI: {
        get () {
          return this.$store.state.crud.formData.CUNI
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'CUNI', val: value})
        }
      },
      TypeDocument: {
        get () {
          return this.$store.state.crud.formData.TypeDocument
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'TypeDocument', val: value})
        }
      },
      Document: {
        get () {
          return this.$store.state.crud.formData.Document
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Document', val: value})
        }
      },
      Ext: {
        get () {
          return this.$store.state.crud.formData.Ext
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Ext', val: value})
        }
      },
      FirstSurName: {
        get () {
          return this.$store.state.crud.formData.FirstSurName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'FirstSurName', val: value})
        }
      },
      SecondSurName: {
        get () {
          return this.$store.state.crud.formData.SecondSurName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'SecondSurName', val: value})
        }
      },
      MariedSurName: {
        get () {
          return this.$store.state.crud.formData.MariedSurName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'MariedSurName', val: value})
        }
      },
      Names: {
        get () {
          return this.$store.state.crud.formData.Names
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Names', val: value})
        }
      },
      Gender: {
        get () {
          return this.$store.state.crud.formData.Gender
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Gender', val: value})
        }
      },
      BirthDate: {
        get () {
          return this.$store.state.crud.formData.BirthDate
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'BirthDate', val: value})
        }
      },
      Nationality: {
        get () {
          return this.$store.state.crud.formData.Nationality
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Nationality', val: value})
        }
      },
      AFP: {
        get () {
          return this.$store.state.crud.formData.AFP
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'AFP', val: value})
        }
      },
      NUA: {
        get () {
          return this.$store.state.crud.formData.NUA
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'NUA', val: value})
        }
      },
      UseSecondSurName: {
        get () {
          return this.$store.state.crud.formData.UseSecondSurName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'UseSecondSurName', val: value})
        }
      },
      UseMariedSurName: {
        get () {
          return this.$store.state.crud.formData.UseMariedSurName
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'UseMariedSurName', val: value})
        }
      }
    },
    data () {
      return {
        en: en,
        es: es,
        initialview: 'year',
        format: 'dd-MM-yyyy',
        opendate: new Date(1975, 5, 1),
        url: '/people',
        propsToSearch: ['CUNI', 'Document', 'FirstSurName', 'SecondSurName', 'MariedSurName', 'Names'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 25
          },
          {
            prop: 'CUNI',
            label: 'CUNI',
            minWidth: 50
          },
          {
            prop: 'Document',
            label: 'Document',
            minWidth: 50
          },
          {
            prop: 'FirstSurName',
            label: 'FirstSurName',
            minWidth: 80
          },
          {
            prop: 'SecondSurName',
            label: 'SecondSurName',
            minWidth: 80
          },
          {
            prop: 'MariedSurName',
            label: 'MariedSurName',
            minWidth: 80
          },
          {
            prop: 'Names',
            label: 'Names',
            minWidth: 80
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        selectBranches: {
          select: '',
          values: []
        },
        selectLevel: {
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
        },
        create: false,
        selectGender: {
          select: '',
          values: [{Id: 'M', Name: 'Masculino'},
          {Id: 'F', Name: 'Femenino'}]
        },
        selectDocumentType: {
          select: '',
          values: [{Id: 'CI', Name: 'Carnet de Identidad'},
            {Id: 'CE', Name: 'Carnet Extranjero'},
            {Id: 'PA', Name: 'Pasaporte'}]
        },
        selectNationality: {
          select: '',
          values: [{Id: 'NACIONAL', Name: 'Nacional'},
          {Id: 'EXTRANJERO', Name: 'Extranjero'}]
        },
        selectAFP: {
          select: '',
          values: [{Id: 'PREV', Name: 'Prevision'},
          {Id: 'FUT', Name: 'Futuro'}]
        },
        selectIssued: {
          select: '',
          values: [{Id: 'LP', Name: 'La Paz'},
            {Id: 'CB', Name: 'Cochabamba'},
            {Id: 'SC', Name: 'Santa Cruz'},
            {Id: 'CH', Name: 'Chuquisaca'},
            {Id: 'TJ', Name: 'Tarija'},
            {Id: 'OR', Name: 'Oruro'},
            {Id: 'PT', Name: 'Potosi'},
            {Id: 'BN', Name: 'Beni'},
            {Id: 'PA', Name: 'Pando'}
          ]
        }
      }
    },
    methods: {
      createPeople () {
        this.create = true
      },
      cancelCreate () {
        this.create = false
      },
      loadBranchData () {
        axios.get('branches/')
          .then(response => {
            this.selectBranches.values = response.data
          })
          .catch(error => console.log(error))
      },
      loadLevelData () {
        axios.get('level/')
          .then(response => {
            this.selectLevel.values = response.data
          })
          .catch(error => console.log(error))
      }
    },
    created () {
      this.loadBranchData()
      this.loadLevelData()
    }
  }
</script>
<style>
  .btn-group{
    margin: 20px;
  }
</style>
