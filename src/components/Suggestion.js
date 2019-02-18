import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Suggestion.css";
import { escapeRegexpString } from "../utils/regexp";
import Parser from "html-react-parser";

export const highlightQuery = query => wrapperClass => suggestion => {
  if (query.length === 0 || suggestion.length === 0) {
    return suggestion;
  }

  return suggestion.replace(
    new RegExp(`(${escapeRegexpString(query)})`, "gi"),
    `<span class="${wrapperClass}">$1</span>`
  );
};

class Suggestion extends Component {
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
    const highlightSuggestion = highlightQuery(this.props.query)(
      "suggestion-box__item-highlight"
    );

    return (
      <ul className="suggestion-box">
        {this.props.suggestions.map((suggestion, index) => (
          <li
            key={index + suggestion.value}
            className={
              "suggestion-box__item" +
              (index === this.props.index
                ? " suggestion-box__item--selected"
                : "")
            }
            onClick={this.handleSuggestionClick(index)}
          >
            {Parser(highlightSuggestion(suggestion.label))}
          </li>
        ))}
      </ul>
    );
  }
}

export default Suggestion;
