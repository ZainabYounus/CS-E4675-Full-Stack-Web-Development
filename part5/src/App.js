import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { NewBlogForm } from './components/NewBlogForm'
import { LoginForm } from './components/LoginForm'

const App = () => {
const [blogs, setBlogs] = useState([])
const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const [user, setUser] = useState(null)
const [errorMessage, setErrorMessage] = useState(null)
const [title, setTitle] = useState("")
const [author, setAuthor] = useState("")
const [url, setUrl] = useState("")

useEffect(() => {
  try{
    blogService.setToken(user?.token)
    blogService.getAll()
    .then(blogs => {
      setBlogs( blogs )
    })
  }
  catch(exception){
    setErrorMessage('Login to get blogs')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }


  }, [])

// The empty array as the parameter of the effect ensures that the effect is executed only when the component is rendered for the first time.
useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    blogService.setToken(user?.token)
  }
}, [])

const handleLogin = async (event) => {
  event.preventDefault()
  
  try {
    const user = await loginService.login({
      username, password,
    })
    
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
      ) 
      
      blogService.setToken(user?.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
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

  const handleCreateNewBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }

    await blogService.createBlog(blog)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
    setAuthor("")
    setTitle("")
    setUrl("")
  }


  const blogsForm = () => {
    return(
    <div>
      <h2>blogs</h2>
      <h4>{user.username} logged in</h4>
      <button onClick={handleLogout}>Log out</button>
      <NewBlogForm title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleCreateBlog={handleCreateNewBlog} />
      {renderBlogs()}
    </div>
    )
  }


const renderBlogs = () => (
  <div>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
    )}
    </div>
    )

    return (
      <div>
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