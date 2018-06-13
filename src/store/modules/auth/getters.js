const userIdGetter = state => state.userId
const accessTokenGetter = state => state.token
const isAuthenticated = (state) => {
  if (state.token) {
    return true
  }
}
export default {
  userIdGetter,
  accessTokenGetter,
  isAuthenticated
}
