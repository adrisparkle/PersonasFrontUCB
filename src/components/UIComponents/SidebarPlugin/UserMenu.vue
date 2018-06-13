<template>
  <div class="user">
    <div class="photo">
      <img src="static/img/faces/face-2.jpg"/>
    </div>
    <div class="info">
      <router-link :to="{ name: 'User Page' }">{{ name }}</router-link>
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
        name: 'Juan Pablo Castillo Rioja',
        posts: [],
        error: []
      }
    },
    created () {
      axios.get('/Persona/' + this.$store.getters.usernameGetter, {
        headers: {
          authorization: 'Bearer ' + this.$store.getters.accessTokenGetter
        }
      })
        .then(response => {
          this.posts = response.data
          console.log(this.posts)
        })
        .catch(e => {
          this.error.push(e)
        })

      // async / await version (created() becomes async created())
      //
      // try {
      //   const response = await axios.get(`http://jsonplaceholder.typicode.com/posts`)
      //   this.posts = response.data
      // } catch (e) {
      //   this.errors.push(e)
      // }
    },
    methods: {
      toggleMenu () {
        this.isClosed = !this.isClosed
      }
    }
  }
</script>
<style>
  .collapsed {
    transition: opacity 1s;
  }
</style>
