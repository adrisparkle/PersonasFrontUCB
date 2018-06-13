<template>
  <div class="row">
    <div class="col-md-8 card">
      <data-tables v-bind="{url, propsToSearch, tableColumns,pagination,actions}">
        <template slot="buttons" slot-scope="props">
          <a :class="'btn btn-simple btn-xs btn-icon btn-' + actions.class" @click="dataTables.handleEdit(props.queriedData[props.index].Id)"><i :class="actions.icon"></i></a>
          <a class="btn btn-simple btn-xs btn-danger btn-icon"  @click="handleDelete(props.$index, props.row)"><i class="ti-close"></i></a>
        </template>
      </data-tables>
    </div>
    <div class="col-md-4">
      <create-form>
      </create-form>
    </div>
  </div>
</template>
<script>
  import CreateForm from './form'
  export default {
    components: {
      CreateForm
    },
    data () {
      return {
        url: '/branches/',
        propsToSearch: ['Name', 'Abr'],
        tableColumns: [
          {
            prop: 'Id',
            label: '#',
            minWidth: 50
          },
          {
            prop: 'Name',
            label: 'Nombre',
            minWidth: 100
          },
          {
            prop: 'Abr',
            label: 'Abr.',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 20],
          total: 0
        },
        actions: {
          icon: 'ti-pencil-alt',
          class: 'info',
          method: 'handleEdit'
        }
      }
    }
  }
</script>
<style>
</style>
