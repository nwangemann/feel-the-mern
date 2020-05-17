import React, { useState, useEffect } from "react";
import DBdisplay from "./DBdisplay";
import axios from "axios";

const Main = () => {
  const [path, setPath] = useState("");
  const [pathStore, setPathStore] = useState([]);

//   useEffect(() => {
//     if (!pathStore) {
//       getPaths();
//     }
//   }, []);

  function getPaths() {
    axios
      .get("/api/paths")
      .then((res) => {
        setPathStore([...res.data])
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
        setPathStore(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <div>
      <h1>Main Component</h1>
      <input
        placeholder="enter file path"
        onChange={(e) => setPath(e.target.value)}
      />
      <button onClick={storePath}>Upload</button>
      <button onClick={getPaths} >Get Paths</button>
      {pathStore.length > 0 ? <DBdisplay pathStore={pathStore} /> : null}
    </div>
  );
};

export default Main;
