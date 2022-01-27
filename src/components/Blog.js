import React, { useState } from 'react'
import ToggleButton from './ToggleButton'


const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [show, setShow] = useState(false)

  let userId = null
  if (user !== null) {
    userId = user.id
  }

  const toggleShow = () => {
    setShow(!show)
  }

  const like = () => {
    const likeBlog = { ...blog, likes: blog.likes +1, user: blog.user.id }
    updateBlog(likeBlog)
  }

  const confirmDel = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id)
    }
  }

  const blogDetails = () => {
    return (
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>Likes {blog.likes} <button onClick={like}>like</button></div>
        <div>{blog.author}</div>
        {userId === blog.user.id && <button onClick={confirmDel}>Remove</button>}
      </div>
    )
  }

  return (
    <div className="blog">
      <h3>{blog.title} <ToggleButton toggle={toggleShow} state={show} /> </h3>
      {show && blogDetails()}
    </div>
  )
}

export default Blog