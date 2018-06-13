<template>
  <data-tables :url="url"
               :propsToSearch="propsToSearch"
               :tableColumns="tableColumns"
               :pagination="pagination">
  </data-tables>
</template>
<script>
  export default {
    data () {
      return {
        url: '/people/',
        propsToSearch: ['CUNI', 'Document'],
        tableColumns: [
          {
            prop: 'CUNI',
            label: 'CUNI',
            minWidth: 100
          },
          {
            prop: 'Document',
            label: 'Documento',
            minWidth: 100
          }
        ],
        pagination: {
          perPage: 10,
          currentPage: 1,
          perPageOptions: [10, 15, 20, 25, 50],
          total: 0
        }
      }
    }
  }
</script>
<style>
</style>
