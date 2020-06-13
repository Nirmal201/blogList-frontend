import React, { useState, useEffect } from "react";
import "./App.css";

import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Success from "./components/Success";
import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = React.createRef();

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

  const loginForm = () => {
    return (
      <div>
        <div>
          <h1>Blog List</h1>
          <p>Login and create blog</p>
          <br />
          <Notification message={errorMessage} />
        </div>

        <Togglable buttonLabel="Login">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlepasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      </div>
    );
  };
  const handleLogOut = (e) => {
    setUser(null);
    window.localStorage.clear(); // wehn we click logout button.
  };
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });
    setSuccessMessage(`${blogObject.title} added.`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const removeBlog = (blog) => {
    if (user.username === blog.user.username) {
      const confirm = window.confirm(`Delete ${blog.title} by ${blog.author}?`);
      if (confirm === true) {
        blogService.remove(blog.id);
        const newBlogs = blogs.filter((b) => b.id !== blog.id);
        setBlogs(newBlogs);
      }
    } else {
      alert("Not valid user to delete");
    }
  };
  const blogForm = () => (
    <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const updateLike = (id) => {
    const blog = blogs.find((b) => b.id === id);
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <h2>Blogs</h2>
          <h3>
            Logged in as{" "}
            <span style={{ color: "lightgreen" }}>{user.name} </span>
          </h3>
          <button onClick={handleLogOut}> Log Out</button>
          <br></br>
          <br></br>
          {blogForm()}
          <Success message={successMessage} />
          <br />
          {blogs
            .sort((a, b) => {
              return b.likes - a.likes;
            })
            .map((blog) => {
              return (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user.name}
                  updateLike={() => updateLike(blog.id)}
                  remove={() => removeBlog(blog)}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default App;
