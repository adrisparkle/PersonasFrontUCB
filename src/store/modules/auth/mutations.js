const authUser = (state, authData) => {
  state.token = authData.token
  state.refreshToken = authData.refreshToken
  state.userId = authData.userId
}

const refreshUser = (state, authData) => {
  state.token = authData.token
}

export default {
  authUser,
  refreshUser
}
