import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [datas, setDatas] = useState("a");
  const [filterBooks, setFilterBooks] = useState([]);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  const fetchData = async (query) => {
    try {
      const response = await axios.post(
        "https://reactnd-books-api.udacity.com/search",
        {
          query,
          maxResults: 10,
        },
        {
          headers: {
            Authorization: "Bearer YOUR_API_KEY",
            content: "application/json",
          },
        }
      );

      if (response.data.books.error === "empty query") {
        setError("No results found");
        setFilterBooks([]);
      } else {
        setFilterBooks(response.data.books);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearchChange = (event) => {
    setDatas(event.target.value);
  };

  const openForm = () => {
    setVisible(true);
  };

  const closeForm = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchData(datas);
  }, [datas]);

  return (
    <>
      <div className="nav">
        <h1>Kalvium Books.♡</h1>
        <div id="inputbox">
          <input
            type="search"
            className="searchbar"
            placeholder="Type a letter to search"
            value={datas}
            onChange={handleSearchChange}
          />
        </div>
        <button
          style={{ fontFamily: "cursive", fontSize: "16px" }}
          className="register"
          onClick={openForm}
        >
          Register
        </button>
      </div>

      {error && (
        <div className="error-container">
          <h1 style={{ color: "red" }}>Error</h1>
        </div>
      )}

      <div className="Booklist">
        {filterBooks.map((book) => (
          <div key={book.id}>
            <img src={book.imageLinks?.thumbnail} alt="" />
            <h4> {book.title} </h4>
            <h5 className="authors">{book.authors}</h5>
            <p style={{ color: "red" }} className="rating">
              {book.averageRating ? `${book.averageRating}★| Free` : "Free"}{" "}
            </p>
          </div>
        ))}
      </div>

      {visible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeForm}>
              &times;
            </span>
            <Form />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
