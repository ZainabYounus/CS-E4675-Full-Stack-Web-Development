import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { NewBlogForm } from './components/NewBlogForm'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { Togglable } from './components/Togglable'
import './styling/App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const blogFormRef = useRef()

  const testSubmit = () => {
    return
  }

  // The empty array as the parameter of the effect ensures that the effect is executed only when the component is rendered for the first time.
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      } catch (exception) {
        // setMessage('Login to get blogs')
        // setError(true)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 5000)
      }
    }
    fetchBlogs()
  }, [])

  // useEffect(() => {
  //   try{
  //     console.log('called2', user)
  //     blogService.getAll()
  //       .then(blogs => {
  //         blogs.sort((a, b) => b.likes - a.likes)
  //         setBlogs( blogs )
  //       })
  //   }
  //   catch(exception){
  //     setMessage('Login to get blogs')
  //     setTimeout(() => {
  //       setMessage(null)
  //     }, 5000)
  //   }


  // }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      // fetch blogs
      try {
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      } catch (exception) {
        setMessage('Login to get blogs')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }

    } catch (exception) {
      setMessage('Wrong credentials')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {

      window.localStorage.removeItem('loggedBlogappUser')

      blogService.setToken('')
      setUser(null)
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      setTimeout(() => {
        // setErrorMessage(null)
      }, 5000)
    }
  }


  const updateBlog = async (blog) => {

    const updateBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      await blogService.update(blog.id, updateBlog)
      const updatedBlogs = await blogService.getAll()
      updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    } catch (e) {
      console.error(e)
      setMessage('Something went wrong, please try again')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }


  const blogsForm = () => {

    return(
      <div>
        <h4 className='loggedin-user'>{user.username} logged in</h4>
        <button className='logout-button' onClick={handleLogout}>Log out</button>

        <Togglable className='togglable-button' buttonLabel="new blog" ref={blogFormRef}>
          <NewBlogForm setMessage={setMessage} setBlogs={setBlogs} setError={setError} blogFormRef={blogFormRef} testSubmit={testSubmit}/>
        </Togglable>

        {renderBlogs()}
      </div>

    )
  }


  const renderBlogs = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} setMessage={setMessage} setError={setError} updateBlog={updateBlog}/>
      )}
    </div>
  )

  return (
    <div>
      <h1 id='app-header'>Blogs</h1>
      {
        message !== null && <Notification message={message} error={error} />
      }
      {
        user === null
          ?
          <LoginForm handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} />
          :
          blogsForm()
      }
    </div>
  )

}

export default App