import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Stack } from 'react-bootstrap'
import { Button } from 'react-bootstrap'



const BlogList = ({ user }) => {

  const blogs = useSelector(state => {
    return state.blogs.sort((a,b) => b.likes - a.likes)
  })


  return (
    <>
      <h2>blogs</h2>
      {user && <Link to="/create"><Button variant="primary" type="submit">New blog</Button></Link>}
      <Stack gap={2}>
        { blogs.map(blog =>
          <div key={blog.id}><Link to={`/blog/${blog.id}`}>{blog.title}</Link></div>
        )
        }
      </Stack>
    </>
  )

}

export default BlogList