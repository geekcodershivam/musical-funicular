import React, { useState } from "react";
import "../Assets/SearchBar.css";
import { TextField, Button } from "@material-ui/core";

function SearchBar({ placeholder, values }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    values(searchWord);
    const items = JSON.parse(localStorage.getItem("suggestion"));
    if (items) {
      const data=[...new Set(items)]
      const newFilter = data.filter((value) => {
        return value.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    }
  };

  const clearInput = (word) => {
    setFilteredData([]);
    setWordEntered(word);
    values(word);
    
  };
  const clearLocalStorage = (e) => {
    localStorage.removeItem("suggestion");
    setFilteredData([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchWord = wordEntered;
    const items = JSON.parse(localStorage.getItem("suggestion"));

    if (items) {
      items.push(searchWord);
      localStorage.setItem("suggestion", JSON.stringify(items));
    } else localStorage.setItem("suggestion", JSON.stringify([searchWord]));
  };

  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        {filteredData.length !== 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a
                  className="dataItem"
                  onClick={(e) => clearInput(e.target.innerText)}
                >
                  <p>{value} </p>
                </a>
              );
            })}
            <Button
              variant="contained"
              color="secondary"
              className="btn"
              onClick={clearLocalStorage}
              style={{
                marginLeft: 'calc(100% - 130px)',
                marginTop: 'calc(100% - 80%)',
                marginBottom: '20px'
              }}
            >
              clear All
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
