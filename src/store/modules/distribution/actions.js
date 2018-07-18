import axios from 'axios/index'

const uploadedFiles = ({ commit, state }) => {
  const formData = {
    mes: state.mes,
    gestion: state.gestion,
    segmentoOrigen: state.segmentoOrigen
  }
  axios.post('/payroll/checkupload', formData)
    .then(response => {
      commit('uploadedFilesSetter', response.data)
    })
    .catch(error => console.log(error))
}
export default {
  uploadedFiles
}
