import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'



const User = () => {
  const id = useParams().id
  const user = useSelector(state => state.users.find(user => user.id === id))
  console.log(id, user)
  if (!user) {
    return null
  }
  return (
    <>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </>
  )
}

export default User