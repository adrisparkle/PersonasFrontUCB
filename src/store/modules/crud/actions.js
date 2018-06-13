import axios from 'axios/index'

const loadData = ({ commit }, url) => {
  axios.get(url)
    .then(response => {
      commit('dataSetter', response.data)
    })
    .catch(error => console.log(error))
}

const create = ({ dispatch }, formData) => {
  axios.post(formData.url, formData.values)
    .then(response => {
      dispatch('loadData', formData.url)
    })
    .catch(error => console.log(error))
}

export default {
  loadData,
  create
}
