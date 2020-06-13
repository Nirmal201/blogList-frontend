import React, { useState } from "react";

const Blog = ({ blog, updateLike, remove }) => {
  const [showDetail, setShowDetails] = useState(true);

  //Temporary design
  const blogStyle = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const handleShowDetail = () => {
    setShowDetails(!showDetail);
  };
  return (
    <div style={blogStyle}>
      <div>
        <p>
          {blog.title} - {blog.author}
        </p>
        <button onClick={handleShowDetail}>
          {showDetail === true ? "View" : "Hide"}
        </button>
      </div>

      {!showDetail && (
        <div>
          <p>{blog.url}</p>
          Likes <span>{blog.likes} </span>
          <button onClick={updateLike}>Like</button>
          <p style={{ fontWeight: "bold", color: "coral" }}>
            {" "}
            {blog.user.name}
          </p>
          <button onClick={() => remove(blog.id)}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default Blog;
