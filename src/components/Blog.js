import React from "react";
const Blog = ({ blog, user }) => (
  <div>
    <p>
      {blog.title} {blog.author}-
      <span style={{ fontWeight: "bold", color: "coral" }}>{user}</span>
    </p>
  </div>
);

export default Blog;
