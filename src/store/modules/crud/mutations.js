const dataSetter = (state, data) => {
  state.data = data
}
const formDataSetter = (state, data) => {
  state.formData = data
}
const formDataCleaner = (state) => {
  state.formData = {}
}
const editSetter = (state, data) => {
  state.edit = data
}

const formDataFieldSetter = (state, data) => {
  state.formData[data.field] = data.val
}
export default {
  dataSetter,
  formDataSetter,
  formDataFieldSetter,
  formDataCleaner,
  editSetter
}
