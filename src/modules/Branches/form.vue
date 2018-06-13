<template>
  <div class="card">
    <form @submit.prevent="create">
      <div class="card-header">
        <h4 class="card-title">
          Stacked Form
        </h4>
      </div>
      <div class="card-content">
        <div class="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Nombre" class="form-control" v-model="formData.values.Name">
        </div>
        <div class="form-group">
          <label>Abbr</label>
          <input type="text" placeholder="Abbr" class="form-control" v-model="formData.values.Abr">
        </div>
        <button type="submit" class="btn btn-fill btn-info">Submit</button>
      </div>
    </form>
  </div> <!-- end card -->
</template>

<script>
  export default {
    data () {
      return {
        formData: {
          url: '/branches/',
          values: {
            Name: null,
            Abr: null
          }
        }
      }
    },
    methods: {
      create () {
        this.$store.dispatch('crud/create', this.formData)
      }
    }
  }
</script>

<style>

</style>
