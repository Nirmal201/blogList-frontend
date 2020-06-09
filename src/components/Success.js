import React from "react";

const Success = ({ message }) => {
  if (message === null || message === "") {
    return null;
  }
  return <div className="success">{message}</div>;
};

export default Success;
