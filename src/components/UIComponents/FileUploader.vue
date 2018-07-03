<template>
  <div class="col-md-12">
    <div id="file-upload-form" class="uploader">
      <input type="file" id="file" ref="file" v-on:change="submitFile"/>
      <label for="file" id="file-drag">
        <img id="file-image" src="#" alt="Preview" class="hidden">
        <div id="start">
          <i class="fa fa-upload" aria-hidden="true"></i>
          <div>Select a file or drag here</div>
          <div id="notimage" class="hidden">Please select an image</div>
          <span id="file-upload-btn" class="btn btn-primary">Select a file</span>
        </div>
        <div id="response" class="hidden">
          <div id="messages"></div>
        </div>
      </label>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import swal from 'sweetalert2'
  export default {
    data () {
      return {
        file: ''
      }
    },
    props: {
      url: {
        type: String,
        required: true
      }
    },
    methods: {
      submitFile () {
        this.$store.commit('crud/loadSetter', true)
        this.file = this.$refs.file.files[0]
        let formData = new FormData()
        formData.append('file', this.file)
        axios.post(this.url,
          formData,
          {
            responseType: 'arraybuffer',
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function () {
          this.$store.commit('crud/loadSetter', false)
          console.log('SUCCESS!!')
        })
          .catch(error => {
            this.$store.commit('crud/loadSetter', false)
            const errors = JSON.parse(error.response.headers.uploaderrors)
            let e = ''
            for (const key in errors) {
              e += errors[key] + '<br>'
            }
            console.log(e)
            const blob = new Blob([error.response.data], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            })
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', 'file.xlsx')
            document.body.appendChild(link)
            // link.click()
            swal({
              title: 'ERROR',
              html: e,
              type: 'error',
              confirmButtonClass: 'btn btn-info btn-fill',
              buttonsStyling: false
            })
          })
      }
    }
  }
</script>
<style>
  .uploader {
    display: block;
    clear: both;
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
  }
  .uploader label {
    float: left;
    clear: both;
    width: 100%;
    padding: 2rem 1.5rem;
    text-align: center;
    background: #fff;
    border-radius: 7px;
    border: 3px solid #eee;
    transition: all .2s ease;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .uploader label:hover {
    border-color: #1c3b6c;
  }
  .uploader label.hover {
    border: 3px solid #1c3b6c;
    box-shadow: inset 0 0 0 6px #eee;
  }
  .uploader label.hover #start i.fa {
    -webkit-transform: scale(0.8);
    transform: scale(0.8);
    opacity: 0.3;
  }
  .uploader #start {
    float: left;
    clear: both;
    width: 100%;
  }
  .uploader #start.hidden {
    display: none;
  }
  .uploader #start i.fa {
    font-size: 50px;
    margin-bottom: 1rem;
    transition: all .2s ease-in-out;
  }
  .uploader #response {
    float: left;
    clear: both;
    width: 100%;
  }
  .uploader #response.hidden {
    display: none;
  }
  .uploader #response #messages {
    margin-bottom: .5rem;
  }
  .uploader #file-image {
    display: inline;
    margin: 0 auto .5rem auto;
    width: auto;
    height: auto;
    max-width: 180px;
  }
  .uploader #file-image.hidden {
    display: none;
  }
  .uploader #notimage {
    display: block;
    float: left;
    clear: both;
    width: 100%;
  }
  .uploader #notimage.hidden {
    display: none;
  }
  .uploader progress,
  .uploader .progress {
    display: inline;
    clear: both;
    margin: 0 auto;
    width: 100%;
    height: 8px;
    border: 0;
    border-radius: 4px;
    background-color: #eee;
    overflow: hidden;
  }
  .uploader .progress[value]::-webkit-progress-bar {
    border-radius: 4px;
    background-color: #eee;
  }
  .uploader .progress[value]::-webkit-progress-value {
    background: #1c3b6c;
    border-radius: 4px;
  }
  .uploader .progress[value]::-moz-progress-bar {
    background: #1c3b6c;
    border-radius: 4px;
  }
  .uploader input[type="file"] {
    display: none;
  }
  .uploader div {
    margin: 0 0 .5rem 0;
    color: #5f6982;
  }
  .uploader .btn {
    display: inline-block;
    margin: .5rem .5rem 1rem .5rem;
    clear: both;
    font-family: inherit;
    font-weight: 700;
    font-size: 14px;
    text-decoration: none;
    text-transform: initial;
    border: none;
    border-radius: .2rem;
    outline: none;
    padding: 0 1rem;
    height: 36px;
    line-height: 36px;
    color: #fff;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    background: #1c3b6c;
    border-color: #1c3b6c;
    cursor: pointer;
  }

</style>
