import '../styling/App.css'

export const LoginForm = ({ handleLogin, username, password, setPassword, setUsername }) => {
  return(
    <div>
      <h1>log in to application</h1>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username-input'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id='password-input'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button className='login-button' type="submit">login</button>
      </form>

    </div>
  )
}