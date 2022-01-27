
import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, password, handleLogin, handleUsername, handlePassword }) => {

  return (
    <>
      <h2>Login</h2>
      <form className="form" onSubmit={handleLogin}>
        <div className="formline">
          <label>Username</label>
          <input id="username" type="text" value={username} onChange={handleUsername} />
        </div>
        <div className="formline">
          <label>Password</label>
          <input id="password" type="password" value={password} onChange={handlePassword} />
        </div>
        <button id="login-button" type="submit">Login</button>
      </form>
    </>
  )

}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired
}

export default LoginForm