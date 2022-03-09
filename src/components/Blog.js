import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducer/blogReducer'
import { useParams } from 'react-router-dom'
import Comments from './Comments'
import { Button } from 'react-bootstrap'



const Blog = ({ user }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blogs.find(blog => blog.id === id))
  if (!blog) {
    return null
  }


  let userId = null
  if (user !== null) {
    userId = user.id
  }
  console.log(userId, blog.user.id)

  const like = () => {
    const likedBlog = { ...blog, likes: blog.likes +1, user: blog.user.id }
    dispatch(likeBlog(likedBlog))
  }

  const confirmDel = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  return (
    <div className="blog">
      <h3>{blog.title} </h3>
      <div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div>Likes: {blog.likes} <Button onClick={like}>like</Button></div>
        <div>Author: {blog.author}</div>
        {userId === blog.user.id && <Button variant="secondary" onClick={confirmDel}>Remove</Button>}
      </div>
      <Comments id={id} />
    </div>
  )
}

export default Blog