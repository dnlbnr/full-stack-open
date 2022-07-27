import { useState } from 'react'
import useLogin from '../hooks/useLogin'

const initialFormValues = {
  username: '',
  password: '',
}

function LoginForm() {
  const { login } = useLogin()
  const [formValues, setFormValues] = useState(initialFormValues)
  const { username, password } = formValues

  const handleChange = ({ target }) => {
    const { name, value } = target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username === '' || password === '') {
      console.log('Please provide username and password')
    } else {
      login(username, password)
      setFormValues(initialFormValues)
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username:{' '}
          <input
            type="text"
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />{' '}
          Password:{' '}
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
          />{' '}
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
