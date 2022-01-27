import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {

  let component
  let mockUpdateBlog
  beforeEach(() => {
    const blog = {
      title: 'A test blog',
      author: 'kjartan',
      url: 'url',
      likes: 10,
      user: {
        id: 'author id'
      }
    }

    const user = { id: 'someid' }
    mockUpdateBlog = jest.fn()
    component = render(<Blog user={user} blog={blog} updateBlog={mockUpdateBlog} />)
  })

  test('renders content', () => {

    component.debug()

    expect(component.container).toHaveTextContent('A test blog')
    expect(component.container).not.toHaveTextContent('kjartan')
    expect(component.container).not.toHaveTextContent('url')
  })

  test('click the show displays the blog content', () => {
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('kjartan')
    expect(component.container).toHaveTextContent('url')

  })

  test('clicking the button calls event handler two times', () => {

    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockUpdateBlog.mock.calls).toHaveLength(2)

  })
})



