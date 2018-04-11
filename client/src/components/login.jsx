import React from 'react';

const Login = () => (
  <form action="/login" method="post">
    <div>
      <label>Username:</label>
      <input id="username" placeholder="username" type="text" name="username" />
    </div>
    <div>
      <label>Password:</label>
      <input id="password" placeholder="password" type="password" name="password" />
    </div>
    <div>
      <input id="login" type="submit" value="Log In" />
    </div>
  </form>
);

export default Login;
