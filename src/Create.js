//write here sfc
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Create = () => {
  const [title, settitle] = useState("");
  const [body, setbody] = useState("");
  const [author, setauthor] = useState("");
  const[isPending ,setisPending]=useState(false);
  const history=useHistory();
  const handleSubmit = (e) => {
    e.preventDefault(); //they cannot refresh the page after sumbit
    const blog = { title, body, author };
    setisPending(true);
    fetch('http://localhost:8000/blogs', {
      //end points
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
      
    }).then(() => {
      console.log("new blog added");
      setisPending(false);
      history.push('/');
    });
  };
  return (
    <div className="create">
      <h2>Add A New Block</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title :</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setbody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setauthor(e.target.value)}>
          <option value="mario">mario</option>
          <option value="Yasi">Yasi</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disable>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
