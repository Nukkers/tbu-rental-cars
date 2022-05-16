// import searchIcon from './search.svg';
import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const getData = async () => {
      if (text.length > 1) {
        try {
          const response = await fetch(
            `https://www.rentalcars.com/FTSAutocomplete.do?solrIndex=fts_en&solrRows=6&solrTerm=${text}`
          );
          if (!response.ok) {
            throw new Error(
              `This is an HTTP error: The status is ${response.status}`
            );
          }
          let actualData = await response.json();
          setData(actualData.results.docs);
        } catch (err) {
          console.log('error:', err);
        }
      }
    };
    getData();
  }, [text]);

  function onChangeHandler(text) {
    setText(text);
  }

  return (
    <div className="App-header container-fluid">
      <form className="bg-warning p-3 rounded" role="search">
        <input
          onChange={(e) => onChangeHandler(e.target.value)}
          value={text}
          className="col-md-12"
          type="text"
          placeholder="Pick-up location"
          aria-label="Pick-up location"
          aria-required="true"
        />
        {data &&
          text.length > 1 &&
          data.map((item, key) => (
            <div key={key} className="">
              {item.name}
            </div>
          ))}
      </form>
    </div>
  );
}
export default App;
