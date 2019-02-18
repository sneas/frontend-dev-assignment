import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Search.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

class Search extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func
  };

  handleQueryChange = e => {
    this.props.onChange(e.target.value);
  };

  handleKeyDown = e => {
    this.props.onKeyDown && this.props.onKeyDown(e);
  };

  handleKeyUp = e => {
    this.props.onKeyUp && this.props.onKeyUp(e);
  };

  clear = () => {
    this.props.onChange("");
  };

  render() {
    return (
      <label className="search">
        <input
          type="text"
          className="search__input"
          value={this.props.value}
          onChange={this.handleQueryChange}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
        />
        {this.props.value !== "" && (
          <FontAwesomeIcon
            className="search__icon search__icon--clickable"
            icon={faTimesCircle}
            onClick={this.clear}
          />
        )}
        <FontAwesomeIcon className="search__icon" icon={faSearch} />
      </label>
    );
  }
}
export default Search;
