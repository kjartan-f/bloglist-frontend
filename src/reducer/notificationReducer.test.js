import  notificationReducer, { createNotification, removeNotification } from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('Notification reducer', () => {

  test('return new state with action NEW_NOTIFICATION', () => {
    const state = []
    const action = createNotification({ notification: 'New notification', type: 'success' })

    deepFreeze(state)
    const newState = notificationReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('remove notification', () => {
    const state = []
    const action = createNotification({ notification: 'First notification', type: 'success' })
    deepFreeze(state)
    const newState = notificationReducer(state, action)


    const sAction = createNotification({ notification: 'Second notification', type: 'success' })
    deepFreeze(newState)
    const secondState = notificationReducer(newState, sAction)

    const removeAction = removeNotification()
    const removeState = notificationReducer(secondState, removeAction)

    console.log(removeState)

    expect(removeState).toHaveLength(1)
    expect(removeState).toContainEqual(sAction.data)
  })

})