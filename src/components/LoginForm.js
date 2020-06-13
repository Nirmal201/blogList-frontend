import React from "react";

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlepasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Login Form</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Username:{" "}
          <input type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={handlepasswordChange}
          />
        </div>

        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
