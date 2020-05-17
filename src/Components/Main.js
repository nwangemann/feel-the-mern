import React, { useState } from "react";
import axios from "axios";

const Main = () => {
  const [path, setPath] = useState("");
  const [pathToUpdate, setPathToUpdate] = useState("");
  const [pathStore, setPathStore] = useState([]);

  function getPaths() {
    axios
      .get("/api/paths")
      .then((res) => {
        setPathStore(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function storePath() {
    let body = { path };
    axios
      .post("/api/newPath", body)
      .then((res) => {
        console.log("res from post", res);
        setPathStore([...res.data]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function handleDelete(id) {
    let body = { id };
    axios
      .put(`/api/delete`, body)
      .then((res) => {
        setPathStore(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function submitEdit(id) {
    let body = { id, pathToUpdate };
    axios
      .put(`/api/edit`, body)
      .then((res) => {
        setPathStore(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const mappedDatabase = pathStore.map((path, i) => {
    return (
      <li id={path._id} key={i} className="pathParent">
        <h3>{path.path}</h3>
        <div className="editParent">
          <input
            type="text"
            onChange={(e) => setPathToUpdate(e.target.value)}
          />
          <button onClick={() => submitEdit(path._id)}>edit</button>
          <button onClick={() => handleDelete(path._id)}>x</button>
        </div>
      </li>
    );
  });

  return (
    <div>
      <h1>Main Component</h1>
      <input
        placeholder="enter file path"
        onChange={(e) => setPath(e.target.value)}
      />
      <button onClick={storePath}>Upload</button>
      <button onClick={getPaths}>Get Paths</button>
      {pathStore.length > 0 ? (
        <div className="mapParent">
          <ul>{mappedDatabase}</ul>
        </div>
      ) : null}
    </div>
  );
};

export default Main;
