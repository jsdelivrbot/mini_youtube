import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';
const API_KEY = 'xxxxxx';
//Create a new component.
const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
}


//Put in one the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
