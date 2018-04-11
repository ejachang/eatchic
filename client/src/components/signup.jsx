import React from 'react';

const Signup = () => (
  <form action="/signup" method="post">
    <div>
      <label>Username:</label>
      <input id="username" placeholder="username" type="text" name="username" />
    </div>
    <div>
      <label>Password:</label>
      <input id="password" placeholder="password" type="password" name="password" />
    </div>
    <div>
      <input id="signup" type="submit" value="Sign Up" />
    </div>
  </form>
);

export default Signup;
