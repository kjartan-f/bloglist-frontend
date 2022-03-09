import React, { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import User from './components/User'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { initBlog } from './reducer/blogReducer'
import BlogList from './components/BlogList'
import { setUser } from './reducer/loginReducer'
import UserList from './components/UserList'
import { initUsers } from './reducer/userReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'


const App = () => {

  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlog())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    if (window.localStorage.getItem('loggedInUser')) {
      const user = JSON.parse(window.localStorage.getItem('loggedInUser'))
      console.log('USER',user.user)
      dispatch(setUser(user.user))
      blogService.setToken(user.token)
    }
  }, [dispatch])


  const handleLogout = () => {
    dispatch(setUser(null))
    window.localStorage.removeItem('loggedInUser')
  }


  return (
    <div className="container">
      <Router>
        <Notification messages={notification} />
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link to="/">Blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link to="/users">Users</Link>
              </Nav.Link>

              <Nav.Link href="#" as="span">
                {user === null
                  ? <Link to="/login">login</Link>
                  : <><em >{user.name} logged in</em><Button variant="secondary" onClick={handleLogout}>Logout</Button></>
                }
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/blog/:id" element={<Blog user={user} />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/create" element={<BlogForm user={user} blogform={blogFormRef} />} />
          <Route path="/" element={<BlogList user={user} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App