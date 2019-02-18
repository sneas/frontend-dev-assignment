import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Suggestion.css";

class Suggestion extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.string),
    index: PropTypes.number,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    list: [],
    index: -1
  };

  handleSuggestionClick = index => e => {
    this.props.onSelect(index, e);
  };

  render() {
    return (
      <ul className="suggestion-box">
        {this.props.list.map((item, index) => (
          <li
            key={index + item}
            className={
              "suggestion-box__item" +
              (index === this.props.index
                ? " suggestion-box__item--selected"
                : "")
            }
            onClick={this.handleSuggestionClick(index)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }
}

export default Suggestion;
