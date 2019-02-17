import React, { Component } from 'react';
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends Component {
  render() {
    return (
        <label className="search">
          <input type="text" className="search__input" />
          <FontAwesomeIcon className="search__icon" icon={faSearch} />
        </label>
    );
  }
}

export default Search;
