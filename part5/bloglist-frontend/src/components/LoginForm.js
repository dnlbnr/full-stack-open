import { useState } from 'react';

const initialFormValues = {
  username: '',
  password: '',
};

function LoginForm({ onSubmit }) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const { username, password } = formValues;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === '' || password === '') {
      console.log('Please provide username and password');
    } else {
      setFormValues(initialFormValues);
      onSubmit(formValues);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username:
          {' '}
          <input type="text" name="username" value={formValues.username} onChange={handleChange} />
          {' '}
          Password:
          {' '}
          <input type="password" name="password" value={formValues.password} onChange={handleChange} />
          {' '}
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
