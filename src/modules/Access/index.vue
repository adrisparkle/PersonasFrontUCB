<template>
  <div class="row">
    <div class="col-md-8 card">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
        <template slot="buttons" slot-scope="props">
          <el-tooltip class="item" effect="dark" content="Modificar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-icon btn-info" @click="props.handleEdit(props.queriedData[props.index].Id)"><i class="fa fa-edit"></i></a>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="Eliminar" placement="top-start">
            <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="props.handleDelete(props.queriedData[props.index].Id)"><i class="fa fa-trash-alt"></i></a>
          </el-tooltip>
        </template>
      </data-tables>
    </div>
    <div class="col-md-4">
      <crud-form v-bind="{url,formData}">
        <div class="form-group">
          <label>Metodo</label>
          <input type="text" placeholder="Metodo" class="form-control" v-model="Method">
        </div>
        <div class="form-group">
          <label>Path</label>
          <input type="text" placeholder="Path" class="form-control" v-model="Path">
        </div>
        <div class="form-group">
          <label>Desc</label>
          <input type="text" placeholder="Description" class="form-control" v-model="Description">
        </div>
        <div class="form-group">
          <label>¿Public?</label>
          <p-switch v-model="Public">
            <i class="fa fa-check" slot="on"></i>
            <i class="fa fa-times" slot="off"></i>
          </p-switch>
        </div>

      </crud-form>
    </div>
  </div>
</template>
<script>
  import PSwitch from 'src/components/UIComponents/Switch.vue'
  export default {
    created () {
      this.$store.commit('crud/formDataFieldSetter', {field: 'Public', val: false})
    },
    components: {
      PSwitch
    },
    computed: {
      Method: {
        get () {
          return this.$store.state.crud.formData.Method
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Method', val: value})
        }
      },
      Path: {
        get () {
          return this.$store.state.crud.formData.Path
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Path', val: value})
        }
      },
      Description: {
        get () {
          return this.$store.state.crud.formData.Description
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Description', val: value})
        }
      },
      Public: {
        get () {
          return this.$store.state.crud.formData.Public
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Public', val: value})
        }
      }
    },
    data () {
      return {
        url: '/access/',
        propsToSearch: ['Method', 'Path', 'Description'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Method',
            label: 'Metodo',
            minWidth: 50
          },
          {
            prop: 'Path',
            label: 'Path',
            minWidth: 100
          },
          {
            prop: 'Description',
            label: 'Description',
            minWidth: 150
          },
          {
            prop: 'Public',
            label: 'Public',
            minWidth: 70
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        formData: {
          Method: null,
          Path: null,
          Description: null,
          Public: false
        }
      }
    }
  }
</script>
<style>
</style>
