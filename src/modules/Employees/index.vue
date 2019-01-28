<template>
  <div class="row">
    <div class="col-md-12 card" v-if="actions==='LIST'">
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
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="Modify(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <template v-if="actions==='MODIFY'">
      <br>
      <button type="button" class="btn btn-lg btn-fill btn-warning pull-right" @click="Back">
          <span class="btn-label">
            <i class="fa fa-angle-double-left"></i>
          </span>
        Volver
      </button>
      <br>
      <br>
      <br>
      <DetailPersonData :index="i"></DetailPersonData>
    </template>
  </div>
</template>
<script>
  import axios from 'axios'
  import Datepicker from 'vuejs-datepicker'
  import {en, es} from 'vuejs-datepicker/dist/locale'
  import DetailPersonData from '../Employees/DetailPersonData'

  export default {
    components: {
      Datepicker,
      DetailPersonData
    },
    data () {
      return {
        i: null,
        actions: 'LIST',
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
        create: false
      }
    },
    methods: {
      Modify (index) {
        console.log(index)
        this.i = index
        this.actions = 'MODIFY'
      },
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
      },
      Back () {
        this.actions = 'LIST'
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
