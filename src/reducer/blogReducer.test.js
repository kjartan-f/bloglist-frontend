

import blogReducer, { initBlog, setBlog, deleteBlog, likeBlog } from './blogReducer'
import deepFreeze from 'deep-freeze'

describe('Blog reducer', () => {


  test('init blogs', () => {
    const state = []

    const blog = [{
      id: 1,
      title: 'title',
      url : 'url',
      author: 'author'
    },
    {
      id: 2,
      title: 'title',
      url : 'url',
      author: 'author'
    }]
    const action = initBlog(blog)

    deepFreeze(state)
    console.log('INITSTATEACTION', action)
    const newState = blogReducer(state, action)
    console.log('INITSTATE', newState)
    expect(newState).toHaveLength(2)
  })

  test('create a new blog', () => {
    const state = []
    const blog = {
      id: 1,
      title: 'title',
      url : 'url',
      author: 'author'
    }
    const action = setBlog(blog)
    deepFreeze(state)

    const newState = blogReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState).toContainEqual(action.data)
  })

  test('delete a  blog', () => {
    const state = []
    const blog = {
      id: 1,
      title: 'title',
      url : 'url',
      author: 'author'
    }
    const action = setBlog(blog)
    deepFreeze(state)
    const newState = blogReducer(state, action)

    const delAction = deleteBlog(1)
    deepFreeze(newState)
    const delState = blogReducer(newState, delAction)

    expect(delState).toHaveLength(0)
  })

  test('like a blog', () => {
    const state = []
    const blog = {
      id: 1,
      title: 'title',
      url : 'url',
      author: 'author',
      likes: 0
    }
    const action = setBlog(blog)
    deepFreeze(state)
    const newState = blogReducer(state, action)

    const likedBlog = {
      id: 1,
      title: 'title',
      url : 'url',
      author: 'author',
      likes: 1
    }
    const likeAction = likeBlog(likedBlog)
    deepFreeze(newState)
    const likeState = blogReducer(newState, likeAction)

    expect(likeState).toHaveLength(1)
    expect(likeState).toContainEqual(likeAction.data)
  })
})