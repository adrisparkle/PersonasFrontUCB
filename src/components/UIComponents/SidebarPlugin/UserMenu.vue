<template>
  <div class="user">
    <div class="photo">
      <img src="static/img/faces/face-2.png"/>
    </div>
    <div class="info">
      <router-link v-if="!sidebarStore.isMinimized" :to="{ }">{{ name }}</router-link>
    </div>
  </div>
</template>
<script>
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'
  import axios from 'axios'
  export default {
    components: {
      [CollapseTransition.name]: CollapseTransition
    },
    data () {
      return {
        isClosed: true,
        name: null,
        posts: [],
        error: []
      }
    },
    methods: {
      loadData () {
        axios.get('user/' + localStorage.getItem('userId'))
          .then(response => {
            this.name = response.data.Name
          })
          .catch(error => {
            console.log(error)
            this.name = 'erooor'
          })
      }
    },
    created () {
      this.loadData()
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
