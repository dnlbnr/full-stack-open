import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = ({ onLogin }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => console.log(error.graphQLErrors[0].message),
  });

  useEffect(() => {
    if (result.data) {
      const token = `bearer ${result.data.login.value}`;
      onLogin(token);
    }
  }, [result, onLogin]);

  function handleSubmit(e) {
    e.preventDefault();
    login({ variables: { username, password } });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={({ target }) => setUserName(target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
