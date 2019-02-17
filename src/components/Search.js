import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

class Search extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  handleQueryChange = (e) => {
    this.props.onChange(e.target.value);
  }

  clear = () => {
    this.props.onChange('');
  }

  render() {
    return (
        <label className="search">
          <input type="text" className="search__input" value={this.props.value} onChange={this.handleQueryChange} />
          {this.props.value !== '' && (
              <FontAwesomeIcon className="search__icon" icon={faTimesCircle} onClick={this.clear} />
          )}
          <FontAwesomeIcon className="search__icon" icon={faSearch} />
        </label>
    );
  }
}

export default Search;
