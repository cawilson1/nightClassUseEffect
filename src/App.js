import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Paper, Card } from "@material-ui/core";
import Nav from "./components/Nav";
import CalendarTodayTwoToneIcon from "@material-ui/icons/CalendarTodayTwoTone";

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
  }, [toggle]);

  return (
    <div className="App">
      <Nav setQuery={setQuery} setToggle={setToggle} toggle={toggle} />
      <header className="App-header">
        <p style={appStyles.queryStringStyle}>{query}</p>
        <div>
          {articles[0] === undefined ? (
            <div>LOADING...</div>
          ) : (
            articles.map(article => {
              return (
                <Paper key={article.objectID} style={appStyles.paperStyle}>
                  <h4>{article.title}</h4>
                  <p>{article.author}</p>
                  {/* <p>{article.url}</p> */}
                  <div style={appStyles.dateStyle}>
                    <CalendarTodayTwoToneIcon style={appStyles.calenderStyle} />{" "}
                    <p>
                      {article.created_at
                        .slice(0, 10)
                        .split("-")
                        .join(" ")}
                    </p>
                  </div>

                  <br />
                </Paper>
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
  },
  paperStyle: {
    width: 600
  },
  dateStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  calenderStyle: {
    paddingRight: 15
  }
};

export default App;
