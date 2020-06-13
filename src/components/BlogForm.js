import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const addBlog = (e) => {
    e.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create new blog.</h2>
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
        {"  "} Author:{" "}
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
        <br />
        <br />
      </form>
    </div>
  );
};

export default BlogForm;
