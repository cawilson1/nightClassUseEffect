import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { blue } from "color-name";

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
        <p style={appStyles.queryStringStyle}>{query}</p>
        <div>
          {articles[0] === undefined ? (
            <div>LOADING...</div>
          ) : (
            articles.map(article => {
              return (
                <div key={article.objectID} style={appStyles.card}>
                  <h4>{article.title}</h4>
                  <p>{article.author}</p>
                  <p>{article.url}</p>
                  <p>
                    {article.created_at
                      .slice(0, 10)
                      .split("-")
                      .join(" ")}
                  </p>
                  <br />
                </div>
              );
            })
          )}
        </div>
      </header>
    </div>
  );
}

const appStyles = {
  queryStringStyle: { fontWeight: "bold", fontSize: "40px", color: "red" },
  card: {
    width: "auto",
    height: 400,
    backgroundColor: "white",
    color: "black",
    borderRadius: 5
  }
};

export default App;
