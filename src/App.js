import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

//https://hn.algolia.com/api/v1/search?query=browser

function App() {
  const [articles, setArticles] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [query, setQuery] = useState("browser");
  console.log(query);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/search?query=${query}`
        );
        // console.log(response);
        //   console.log(response.data);
        console.log(response.data.hits);
        setArticles(response.data.hits);
      } catch (err) {
        console.log(err);
      }
      //console.log(toggle);
      //setArticles("Article was set");
    }
    getData();
  }, [query]);

  return (
    <div className="App">
      <header className="App-header">
        <input onChange={event => setQuery(event.target.value)} />
        <button onClick={() => setToggle(!toggle)}>Run Articles</button>
        <p>{query}</p>
        <div>
          {articles.map(article => {
            return <div key={article.objectID}>{article.title}</div>;
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
