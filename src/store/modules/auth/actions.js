import axios from 'axios/index'
import router from 'src/router/index'
const login = ({ commit, dispatch }, authData) => {
  commit('crud/loadSetter', true, { root: true })
  axios.post('/auth/GetToken', authData)
    .then(response => {
      commit('crud/loadSetter', false, { root: true })
      localStorage.setItem('userId', response.data.Id)
      localStorage.setItem('token', response.data.Token)
      localStorage.setItem('refreshToken', response.data.RefreshToken)
      commit('authUser', {
        token: response.data.Token,
        refreshToken: response.data.RefreshToken,
        userId: response.data.Id
      })
      axios.defaults.headers.common['token'] = response.data.Token
      dispatch('setLogoutTimer', response.data.RefreshExpiresIn)
      dispatch('setRefreshTimer', response.data.ExpiresIn)
      router.push(response.data.AccessDefault)
    })
    .catch(error => console.log(error))
}

const refresh = ({ commit, dispatch }) => {
  axios.post('/auth/refreshToken/', {
    RefreshToken: localStorage.getItem('refreshToken')
  },
    {
      headers: {
        'token': localStorage.getItem('token')
      }
    })
    .then(response => {
      localStorage.setItem('token', response.data.Token)
      commit('refreshUser', {
        token: response.data.Token
      })

      axios.defaults.headers.common['token'] = response.data.Token
      dispatch('setRefreshTimer', response.data.ExpiresIn)
    })
    .catch(error => console.log(error))
}

const reload = ({ commit, dispatch }) => {
  axios.post('/auth/refreshToken/', {
    RefreshToken: localStorage.getItem('refreshToken')
  },
    {
      headers: {
        'token': localStorage.getItem('token')
      }
    })
    .then(response => {
      localStorage.setItem('token', response.data.Token)
      commit('refreshUser', {
        token: response.data.Token
      })

      axios.defaults.headers.common['token'] = response.data.Token
      dispatch('setRefreshTimer', response.data.ExpiresIn)
      dispatch('setLogoutTimer', response.data.RefreshExpiresIn - 1)
    })
    .catch(error => console.log(error))
}

const logout = ({ commit }) => {
  commit('crud/loadSetter', true, { root: true })
  axios.get('/auth/logout/', {
    headers: {
      'token': localStorage.getItem('token')
    }
  })
    .then(response => {
      commit('crud/loadSetter', false, { root: true })
      localStorage.removeItem('userId')
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      commit('authUser', {
        token: null,
        refreshToken: null,
        userId: null
      })
      router.push('/')
    })
    .catch(error => console.log(error))
}

const setLogoutTimer = ({ dispatch }, expirationTimeIn) => {
  setTimeout(() => {
    dispatch('logout')
  }, (expirationTimeIn * 1000) - 1)
}

const setRefreshTimer = ({ dispatch }, expirationTimeIn) => {
  setTimeout(() => {
    dispatch('refresh')
  }, (expirationTimeIn * 1000) - 1)
}


export default {
  login,
  logout,
  setLogoutTimer,
  refresh,
  setRefreshTimer,
  reload
}
