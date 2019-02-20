import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SearchInput.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faSearch } from "@fortawesome/free-solid-svg-icons";

class SearchInput extends Component {
  static propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func
  };

  static defaultProps = {
    name: "",
    value: "",
    onChange: () => {},
    onKeyDown: () => {},
    onFocus: () => {},
    onBlur: () => {}
  };

  textInput;

  handleChange = e => {
    this.props.onChange(e.target.value);
  };

  handleClearClick = () => {
    this.props.onChange("");
    this.focus();
  };

  handleSubmitClick = e => {
    if (this.props.value === "") {
      e.preventDefault();
      this.focus();
    }
  };

  focus() {
    if (this.textInput) {
      this.textInput.focus();
    }
  }

  render() {
    let clearButtonExtraClass = "";
    if (this.props.value.length === 0) {
      clearButtonExtraClass = "search__button--hidden";
    }

    return (
      <label className="search">
        <input
          type="text"
          name={this.props.name}
          value={this.props.value}
          className="search__input"
          onChange={this.handleChange}
          onKeyDown={this.props.onKeyDown}
          onKeyUp={this.props.onKeyUp}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
          placeholder="Zoeken"
          ref={input => {
            this.textInput = input;
          }}
        />
        <button
          type="button"
          onClick={this.handleClearClick}
          className={`search__button ${clearButtonExtraClass}`}
          tabIndex="-1"
        >
          <FontAwesomeIcon className="search__icon" icon={faTimesCircle} />
        </button>
        <button
          type="submit"
          onClick={this.handleSubmitClick}
          className="search__button"
          tabIndex="-1"
        >
          <FontAwesomeIcon
            className="search__icon search__icon--identifier"
            icon={faSearch}
          />
        </button>
      </label>
    );
  }
}
export default SearchInput;
