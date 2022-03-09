
import loginService from '../services/login'
import blogService from '../services/blogs'


const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.user
  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user
  }
}

export const loginUser = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    blogService.setToken(user.token)
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))

    dispatch(setUser(user.user))
  }
}

export default loginReducer