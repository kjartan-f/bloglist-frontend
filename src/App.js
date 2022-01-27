import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [notification, setNotification] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => {
        setBlogs( blogs )
      })
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('loggedInUser')) {
      const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
      setUser(user.user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const loginUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loginUser))

      blogService.setToken(loginUser.token)
      setUser(loginUser.user)
      setUsername('')
      setPassword('')


      setNotification({ msg: `${loginUser.user.name} has logged in`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (exception) {

      setNotification({ msg: exception.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)

    }
  }

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }


  const createBlog = async (newBlog) => {

    try {
      const author = user? user.name : user
      const savedBlog = await blogService.create(newBlog)
      setBlogs([...blogs, savedBlog])
      blogFormRef.current.toggleShow()
      setNotification({ msg: `New blog "${savedBlog.title}" by ${author}`, type: 'success' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch(exception) {
      setNotification({ msg: exception.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const updateBlog = async (blog) => {

    try {
      const updatedBlog = await blogService.update(blog)
      console.log('afterupdate',updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog ))
    } catch (exception) {
      setNotification({ msg: exception.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }

  }

  const removeBlog = async (id) => {
    try {
      await blogService.deleteBlog(id)
      setBlogs(blogs.filter(blog => blog.id !== id ))
    } catch (exception) {
      setNotification({ msg: exception.response.data.error, type: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={notification} />

      {user === null
        ?
        <Togglable text="Login">
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleUsername={handleUsername}
            handlePassword={handlePassword}
            user={user}
            handleLogout={handleLogout}
          />
        </Togglable>
        :
        <div>
          {user.name} is logged in
          <button onClick={handleLogout}>Logout</button>
          <Togglable text="New blog" ref={blogFormRef}>
            <BlogForm
              author={user.name}
              createBlog={createBlog}
            />
          </Togglable>
        </div>
      }

      <h2>blogs</h2>
      <div className="blog-list">
        {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} removeBlog={removeBlog}/>
        )}
      </div>
    </div>
  )
}

export default App