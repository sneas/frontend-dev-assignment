import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SuggestionBox.css";
import Highlight from "../Highlight/Highlight";

class SuggestionBox extends Component {
  static propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number,
    query: PropTypes.string,
    onSelect: PropTypes.func.isRequired
  };

  static defaultProps = {
    suggestions: [],
    index: -1,
    query: ""
  };

  handleSuggestionClick = index => e => {
    this.props.onSelect(index, e);
  };

  render() {
    return (
      <ul className="suggestion-box">
        {this.props.suggestions.map((suggestion, index) => (
          <li
            key={index}
            className={
              "suggestion-box__item" +
              (index === this.props.index
                ? " suggestion-box__item--selected"
                : "")
            }
            onClick={this.handleSuggestionClick(index)}
          >
            <Highlight
              text={suggestion.label}
              highlight={this.props.query}
              className="suggestion-box__item-highlight"
            />
          </li>
        ))}
      </ul>
    );
  }
}

export default SuggestionBox;
