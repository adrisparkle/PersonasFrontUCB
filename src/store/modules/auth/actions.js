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
      router.go(0)
      axios.defaults.headers.common['token'] = response.data.Token
      dispatch('setLogoutTimer', response.data.RefreshExpiresIn)
      dispatch('setRefreshTimer', response.data.ExpiresIn)
      router.push(response.data.AccessDefault)
    })
    .catch(error => {
      console.log(error)
      commit('crud/loadSetter', false, { root: true })
    })
}

const refresh = ({ commit, dispatch }) => {
  axios.post('/auth/refreshToken/', {
    RefreshToken: localStorage.getItem('refreshToken')
  })
    .then(response => {
      localStorage.setItem('token', response.data.Token)
      commit('refreshUser', {
        token: response.data.Token
      })

      axios.defaults.headers.common['token'] = response.data.Token
      dispatch('setRefreshTimer', response.data.ExpiresIn)
    })
    .catch(error => {
      console.log(error)
      if (error.response.status === 401) {
        dispatch('logout')
      }
    })
}

const reload = ({ commit, dispatch }) => {
  axios.post('/auth/refreshToken/', {
    RefreshToken: localStorage.getItem('refreshToken')
  }
    )
    .then(response => {
      localStorage.setItem('token', response.data.Token)
      commit('refreshUser', {
        token: response.data.Token
      })

      axios.defaults.headers.common['token'] = response.data.Token
      dispatch('setRefreshTimer', response.data.ExpiresIn)
      dispatch('setLogoutTimer', response.data.RefreshExpiresIn)
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
      router.go(0)
    })
    .catch(error => {
      console.log(error)
      commit('authUser', {
        token: null,
        refreshToken: null,
        userId: null
      })
      router.push('/')
      router.go(0)
      commit('crud/loadSetter', false, { root: true })
    })
}

const setLogoutTimer = ({ dispatch }, expirationTimeIn) => {
  setTimeout(() => {
    dispatch('logout')
  }, (expirationTimeIn * 1000) - 5)
}

const setRefreshTimer = ({ dispatch }, expirationTimeIn) => {
  setTimeout(() => {
    dispatch('refresh')
  }, (expirationTimeIn * 1000) - 5)
}


export default {
  login,
  logout,
  setLogoutTimer,
  refresh,
  setRefreshTimer,
  reload
}
