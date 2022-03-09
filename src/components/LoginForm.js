
import React from 'react'
import { useDispatch } from 'react-redux'
import { createNotification, removeNotification } from '../reducer/notificationReducer'
import { loginUser } from '../reducer/loginReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'




const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogin = async (e) => {
    e.preventDefault()
    try {

      const username = e.target.username.value
      const password = e.target.password.value
      await dispatch(loginUser({ username, password }))


      dispatch(createNotification({ notification: `${username} has logged in`, type: 'success' }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
      navigate('/')
    } catch (exception) {
      dispatch(createNotification({ notification: exception.response.data.error, type: 'error' }))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
    }

  }

  return (
    <>
      <h2>Login</h2>
      <Form className="form" onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" id="username" type="text"  />
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" id="password" type="password" />
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </>
  )

}

export default LoginForm