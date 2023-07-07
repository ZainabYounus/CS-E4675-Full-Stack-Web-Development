import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('renders only title and author first', () => {
  const blog = {
    title: 'Testing blog component',
    author: 'Test Author',
    url: 'https://test-url.com',
    likes: 5,
    user: {
      id: '123',
      username: 'testuser',
      name: 'Test User'
    }
  }

  render(
    <Blog blog={blog} setBlogs={() => {}} user={blog.user} setMessage={() => {}} setError={() => {}} updateBlog={() => {}} />
  )

  const titleAndAuthorDiv = screen.getByText(`${blog.title} - ${blog.author}`)
  expect(titleAndAuthorDiv).toBeInTheDocument()
})

test('Show blog details when clicking show', async () => {
  const blog = {
    title: 'Testing blog component',
    author: 'Test Author',
    url: 'https://test-url.com',
    likes: 5,
    user: {
      id: '123',
      username: 'testuser',
      name: 'Test User'
    }
  }

  const { container } = render(
    <Blog blog={blog} setBlogs={() => {}} user={blog.user} setMessage={() => {}} setError={() => {}} updateBlog={() => {}} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const likes = container.querySelector('#likes')
  const url = container.querySelector('#blog-url')

  expect(likes).toBeInTheDocument()
  expect(url).toBeInTheDocument()
})

test('If like button is clicked twice the event handler for likes is called twice', async () => {
  const blog = {
    title: 'Testing blog component',
    author: 'Test Author',
    url: 'https://test-url.com',
    likes: 5,
    user: {
      id: '123',
      username: 'testuser',
      name: 'Test User'
    }
  }

  const mockupdateBlog = jest.fn()

  render(
    <Blog blog={blog} setBlogs={() => {}} user={blog.user} setMessage={() => {}} setError={() => {}} updateBlog={mockupdateBlog} />
  )

  const user = userEvent.setup()
  const showButton = screen.getByText('show')
  await user.click(showButton)
  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  expect(mockupdateBlog.mock.calls).toHaveLength(1)

  await user.click(likeButton)
  expect(mockupdateBlog.mock.calls).toHaveLength(2)
})

