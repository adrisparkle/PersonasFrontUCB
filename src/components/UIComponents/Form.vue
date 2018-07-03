<template>
  <div class="card">
    <form @submit.prevent="create">
      <div class="card-header">
        <h4 v-if="!this.$store.state.crud.edit" class="card-title">
          Crear
        </h4>
        <h4 v-else class="card-title">
          Modificar
        </h4>
      </div>
      <div class="card-content">
        <slot></slot>
        <button type="submit" class="btn btn-fill btn-info">Enviar</button>
        <button v-if="this.$store.state.crud.edit" type="cancel" class="btn btn-fill btn-danger" @click.prevent="cancel">Cancelar</button>
      </div>
    </form>
  </div> <!-- end card -->
</template>

<script>
  export default {
    props: {
      url: {
        type: String,
        required: true
      },
      formData: {
        type: Object,
        required: true
      }
    },
    methods: {
      create () {
        if (!this.$store.state.crud.edit) {
          this.$store.dispatch('crud/create', this.url)
        } else {
          this.$store.dispatch('crud/update', this.url)
        }
      },
      cancel () {
        this.$store.commit('crud/formDataCleaner')
        this.$store.commit('crud/editSetter', false)
      }
    },
    mounted () {
      this.$store.commit('crud/formDataSetter', this.formData)
    }
  }
</script>

<style>

</style>
