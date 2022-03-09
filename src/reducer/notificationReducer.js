
const initialNotification = []

const notificationReducer = (state = initialNotification, action) => {
  /*console.log('state now: ', state)
  console.log('action', action)*/
  switch(action.type) {
  case 'NEW_NOTIFICATION':
    return [action.data, ...state]
  case 'REMOVE_NOTIFICATION':
    return [...state.slice(0, state.length - 1)]
  default:
    return state
  }

}

export default notificationReducer

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createNotification = (data) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      notification: data.notification,
      id: generateId(),
      type: data.type
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

