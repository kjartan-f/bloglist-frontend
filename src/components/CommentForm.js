import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setComment } from '../reducer/commentReducer'
import { createNotification, removeNotification } from '../reducer/notificationReducer'
import { Form, Button } from 'react-bootstrap'


const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    const newComment = {
      title: title,
      blog: blogId
    }

    dispatch(setComment(newComment))
    dispatch(createNotification({ notification: `New comment "${newComment.title}"`, type: 'success' }))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)

    setTitle('')
  }

  return (
    <>
      <h4>New commment</h4>
      <Form className="form" onSubmit={addBlog}>
        <Form.Control id="title" value={title} onChange={({ target }) => setTitle(target.value)} />
        <Button id="submit-new-blog" type="Submit">Submit</Button>
      </Form>
    </>
  )
}

export default CommentForm