import React, { useState, useEffect } from "react";
import "./App.css";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Success from "./components/Success";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      // Code after this line only executes when user has successfully logged it.
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      console.log(window.localStorage);
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (e) {
      setErrorMessage("Wrong Username or Password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <h3>Login to Blog Application</h3>
        <br></br>
        <Notification message={errorMessage} />
        Username:{" "}
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <br />
      <div>
        Password:{" "}
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <br></br>

      <button type="submit">Login</button>
    </form>
  );
  const handleLogOut = (e) => {
    setUser(null);
    window.localStorage.clear(); // wehn we click logout button.
  };
  const addBlog = (e) => {
    e.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    blogService.create(newBlog).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    });
    setSuccessMessage(`${newBlog.title} added.`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };
  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>Blogs</h2>
          <h3>Logged in as {user.name}</h3>
          <button onClick={handleLogOut}> Log Out</button>
          <br></br>
          <form onSubmit={addBlog}>
            <h3>Create new blog</h3>
            Title:{" "}
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              required
              minLength={3}
            />
            {"  "}
            Author:{" "}
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              required
              minLength={3}
            />
            {"  "}
            URL:{" "}
            <input
              type="text"
              value={url}
              name="URL"
              onChange={({ target }) => setUrl(target.value)}
              required
              minLength={3}
            />
            <br />
            <br />
            <button type="submit">Create</button>
          </form>
          <br />
          <Success message={successMessage} />
          <br />
          <br />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user.name} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
