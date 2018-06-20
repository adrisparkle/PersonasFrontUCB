<template>
  <div class="row">
    <div class="col-md-8 card">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination}">
        <template slot="buttons" slot-scope="props">
          <a class="btn btn-simple btn-xs btn-icon btn-info" @click="props.handleEdit(props.queriedData[props.index].Id)"><i class="ti-pencil"></i></a>
          <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="props.handleDelete(props.queriedData[props.index].Id)"><i class="ti-close"></i></a>
        </template>
      </data-tables>
    </div>
    <div class="col-md-4">
      <crud-form v-bind="{url}">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" class="form-control" v-model="Name">
        </div>
        <div class="form-group">
          <label>Nivel</label>
          <input type="text" placeholder="Nivel" class="form-control" v-model="Level">
        </div>
      </crud-form>
    </div>
  </div>
</template>
<script>
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
      Level: {
        get () {
          return this.$store.state.crud.formData.Level
        },
        set (value) {
          this.$store.commit('crud/formDataFieldSetter', {field: 'Level', val: value})
        }
      }
    },
    data () {
      return {
        url: '/rol/',
        propsToSearch: ['Name', 'Level'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'UserName',
            label: 'Usuario',
            minWidth: 100
          },
          {
            prop: 'Rol',
            label: 'Rol',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        }
      }
    }
  }
</script>
<style>
</style>
