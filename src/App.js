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
    <div className="App-header container">
      <div className="bg-warning form p-4 rounded" role="search">
        <input
          onChange={(e) => onChangeHandler(e.target.value)}
          value={text}
          className="searchBar rounded"
          type="search"
          placeholder="Pick-up location"
          aria-label="Pick-up location"
          aria-required="true"
        />
        {data &&
          text.length > 1 &&
          data.map((item, key) => {
            return (
              <div className="form-control">
                <div key={key} className="labelType">
                  {item.placeType === 'C' && (
                    <span class="badge bg-primary">City</span>
                  )}
                  {item.placeType === 'A' && (
                    <span class="badge bg-warning">Airport</span>
                  )}
                  {item.placeType === 'T' && (
                    <span class="badge bg-primary">Station</span>
                  )}
                  {item.placeType === 'D' && (
                    <span class="badge bg-success">District</span>
                  )}
                  {item.placeType === 'I' && (
                    <span class="badge bg-warning">Region</span>
                  )}
                </div>
                <div className="nameType">
                  <div className="" role={'listbox'}>
                    {item.name} {item.iata && <span>({item.iata})</span>}
                  </div>
                </div>

                <div className="card-subtitle small labelSubtitle">
                  {item.city && <span>{item.city},</span>} {item.region},{' '}
                  {item.country}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
export default App;
