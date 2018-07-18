<template>
  <div class="row">
    <div class="col-md-12 card" v-if="!create">
      <div class="btn-group">
        <button type="button" class="btn btn-lg btn-fill btn-warning">
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
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" class="form-control" v-model="Name">
        </div>
        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Regional"
                     v-model="BranchesId">
            <el-option v-for="option in selectBranches.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Name"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>
        <div class="form-group">
          <el-select class="select-info"
                     size="large"
                     placeholder="Nivel"
                     v-model="LevelId">
            <el-option v-for="option in selectLevel.values"
                       class="select-danger"
                       :value="option.Id"
                       :label="option.Cod"
                       :key="option.Id">
            </el-option>
          </el-select>
        </div>
      </crud-form>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    computed: {
      Name: {
        get () {
          return this.$store.state.crud.formData.Name
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Name', val: value})
        }
      },
      LevelId: {
        get () {
          return this.$store.state.crud.formData.LevelId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'LevelId', val: value})
        }
      },
      BranchesId: {
        get () {
          return this.$store.state.crud.formData.BranchesId
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'BranchesId', val: value})
        }
      }
    },
    data () {
      return {
        url: '/people',
        propsToSearch: ['Name', 'Cod', 'Branch'],
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
            minWidth: 50
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
          Name: null,
          BranchesId: '',
          LevelId: ''
        },
        create: false
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
