import React from "react";
import PropTypes from "prop-types";

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
LoginForm.prototype = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};
export default LoginForm;
