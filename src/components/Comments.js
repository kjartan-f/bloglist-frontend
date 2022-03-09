import React, { useEffect } from 'react'
import CommentForm from './CommentForm'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../reducer/commentReducer'



const Comments = ({ id }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getComments(id))
  }, [dispatch])

  const comments = useSelector(state => state.comments)


  return (
    <>
      <h3>Comments</h3>
      <CommentForm blogId={id} />
      {
        comments.length > 0 ?
          comments.map(comment => <div key={comment.id}>{comment.title}</div>)
          :
          <div>No comments</div>
      }
    </>
  )
}



export default Comments