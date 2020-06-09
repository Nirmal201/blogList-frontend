import React from "react";

const Notification = ({ message }) => {
  console.log("NOTi", message);

  if (message === null || message === "") {
    return null;
  }
  return <div className="error">{message}</div>;
};

export default Notification;
