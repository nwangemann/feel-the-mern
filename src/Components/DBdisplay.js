import React from "react";

const DBdisplay = (props) => {
  const mappedDatabase = props.pathStore.map((path, i) => {
    return <li id={path.id} key={i} >{path.path}</li>;
  });
  return (
    <div>
      <ul>{mappedDatabase}</ul>
    </div>
  );
};

export default DBdisplay;
