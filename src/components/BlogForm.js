import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setBlog } from '../reducer/blogReducer'
import { createNotification, removeNotification } from '../reducer/notificationReducer'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ user } ) => {
  if (!user) {
    return null
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      title: title,
      url : url,
      author: user.name
    }

    dispatch(setBlog(newBlog))
    dispatch(createNotification({ notification: `New blog "${newBlog.title}" by ${user.name}`, type: 'success' }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)

    setTitle('')
    setUrl('')
    navigate('/')
  }

  return (
    <>
      <h2>New blog</h2>
      <Form className="form" onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control id="title" value={title} onChange={({ target }) => setTitle(target.value)} />
          <Form.Label>Author</Form.Label>
          <Form.Control id="author" value={user.name} readOnly/>
          <Form.Label>Url</Form.Label>
          <Form.Control id="url" value={url} onChange={({ target }) => setUrl(target.value)}/>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default BlogForm