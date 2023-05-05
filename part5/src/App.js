import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
const [blogs, setBlogs] = useState([])
const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const [user, setUser] = useState(null)
// const [errorMessage, setErrorMessage] = useState(null)

useEffect(() => {
  blogService.setToken(user?.token)
  blogService.getAll()
  .then(blogs => {
    setBlogs( blogs )
  }
    
    )  
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
      // setErrorMessage('Wrong credentials')
      setTimeout(() => {
        // setErrorMessage(null)
      }, 5000)
    }
  }



const loginForm = () => (
  <div>
    <h1>log in to application</h1>

    <form onSubmit={handleLogin}>
      <div>
      username
      <input
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
      />
      </div>
      <div>
      password
      <input
      type="password"
      value={password}
      name="Password"
      onChange={({ target }) => setPassword(target.value)}
      />
      </div>
      <button type="submit">login</button>
      </form>      

  </div>
  
  )

const renderBlogs = () => (
  <div>
  {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
    )}
    </div>
    )

return (
  <div>
  
  {!user && loginForm()}
  {user && <div>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
    {renderBlogs()}
    </div>}
    
    </div>
    )
  }

export default App