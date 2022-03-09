import commentService from '../services/comments'

const commentReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_COMMENTS':
    return action.data
  case 'NEW_COMMENT':
    return [action.data, ...state]
  default:
    return state
  }
}

export const getComments = (id) => {
  return async dispatch => {
    const comments = await commentService.getCommentByBlogId(id)
    dispatch({
      type: 'GET_COMMENTS',
      data: comments
    })
  }
}

export const setComment = (blog) => {
  return async dispatch => {
    const newComment = await commentService.createComment(blog)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment
    })
  }
}


export default commentReducer