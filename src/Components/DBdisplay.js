import React from "react";

const DBdisplay = (props) => {
  const mappedDatabase = props.pathStore.map((path) => {
    return <li>{path}</li>;
  });
  return (
    <div>
      <ul>{mappedDatabase}</ul>
    </div>
  );
};

export default DBdisplay;
