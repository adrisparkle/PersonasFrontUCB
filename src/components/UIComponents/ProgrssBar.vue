<template>
  <div>
    <div class="progress" style="height: 40px;">
      <div class="progress-bar progress-bar-striped progress-bar-animated active" role="progressbar" aria-valuemin="0" aria-valuemax="100" :style="percentage"> <h3 style="margin-top: 4px">{{currentValue}}%</h3></div>
    </div>
    <div>
      {{comment}}
    </div>
  </div>
</template>
<script>
  export default{
    name: 'ProgressBar',
    props: {
      currentValue: String
    },
    computed: {
      percentage: {
        get () {
          return 'width: ' + this.currentValue + '%'
        }
      },
      comment: {
        get () {
          return 'Subiendo Archivos...'
        }
      }
    }
  }
</script>
<style>
</style>
