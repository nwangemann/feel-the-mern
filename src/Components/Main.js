import React, { useState } from "react";

const Main = () => {
  const [path, setPath] = useState("");
  const [pathStore, setPathStore] = useState([]);
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
      {pathStore.length > 0 ? <DBdisplay pathStore={pathStore} /> : null}
    </div>
  );
};

export default Main;
