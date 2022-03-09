import blogService from '../services/users'

const userReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT_USERS':
    return action.users
  default:
    return state
  }
}


export default userReducer

export const initUsers = () => {
  return async dispatch => {
    const users = await blogService.getAll()
    dispatch({
      type: 'INIT_USERS',
      users
    })
  }
}