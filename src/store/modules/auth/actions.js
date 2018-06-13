import axios from 'axios/index'
import router from 'src/router/index'
const login = ({ commit }, authData) => {
  axios.post('/auth/GetToken/', authData)
    .then(response => {
      commit('authUser', {
        token: response.data.Token,
        refreshToken: response.data.RefreshToken,
        userId: response.data.Id
      })
      router.push('user/profile')
    })
    .catch(error => console.log(error))
}

export default {
  login
}
