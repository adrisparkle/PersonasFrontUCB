const authUser = (state, authData) => {
  state.token = authData.token
  state.refreshToken = authData.refreshToken
  state.userId = authData.userId
}

export default {
  authUser
}
