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
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  textInput;

  handleQueryChange = e => {
    this.props.onChange(e.target.value);
  };

  handleKeyDown = e => {
    this.props.onKeyDown && this.props.onKeyDown(e);
  };

  handleKeyUp = e => {
    this.props.onKeyUp && this.props.onKeyUp(e);
  };

  handleBlur = e => {
    this.props.onBlur && this.props.onBlur(e);
  };

  handleFocus = e => {
    this.props.onFocus && this.props.onFocus(e);
  };

  clear = () => {
    this.props.onChange("");
    if (this.textInput) {
      this.textInput.focus();
    }
  };

  render() {
    let clearButtonExtraClass = "";
    if (this.props.value.length === 0) {
      clearButtonExtraClass = "search__clear-button--hidden";
    }

    return (
      <label className="search">
        <input
          type="text"
          className="search__input"
          ref={input => {
            this.textInput = input;
          }}
          value={this.props.value}
          onChange={this.handleQueryChange}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          placeholder="Zoeken"
        />
        <button
          onClick={this.clear}
          className={`search__clear-button ${clearButtonExtraClass}`}
          tabIndex="-1"
        >
          <FontAwesomeIcon className="search__icon" icon={faTimesCircle} />
        </button>
        <FontAwesomeIcon
          className="search__icon search__icon--identifier"
          icon={faSearch}
        />
      </label>
    );
  }
}
export default Search;
