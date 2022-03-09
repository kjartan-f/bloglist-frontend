import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  /*console.log('state now: ', state)
  console.log('action', action)*/
  switch(action.type) {
  case 'CREATE_BLOG':
    return [...state, action.data]
  case 'INIT_BLOG':
    return action.data
  case 'DELETE_BLOG':
    return state.filter(blog => blog.id !== action.id)
  case 'LIKE_BLOG':
    return state.map(blog => blog.id === action.data.id? action.data : blog)
  default:
    return state
  }
}

export const setBlog = (data) => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch({
      type: 'DELETE_BLOG',
      id
    })
  }
}

export const likeBlog = (data) => {
  return async dispatch => {
    const updatedBlog = await blogService.update(data)
    dispatch({
      type: 'LIKE_BLOG',
      data: updatedBlog
    })
  }
}

export const initBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      data: blogs
    })
  }
}

export default blogReducer