import React, { Component } from "react";
import PropTypes from "prop-types";
import "./SuggestionBox.css";
import Highlight from "../Highlight/Highlight";
import { findNodeByAttribute } from "../../utils/find-node-by-attribute";

export const INDEX_DATA_ATTR = "data-index";

class SuggestionBox extends Component {
  static propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.object),
    index: PropTypes.number,
    query: PropTypes.string,
    onSelect: PropTypes.func
  };

  static defaultProps = {
    suggestions: [],
    index: -1,
    query: "",
    onSelect: () => {}
  };

  handleSuggestionClick = e => {
    const index = findNodeByAttribute(e.target, INDEX_DATA_ATTR).getAttribute(
      INDEX_DATA_ATTR
    );
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
            // Set appropriate index attribute.
            // We'll need it for receiving index in onClick handler
            {...{ [INDEX_DATA_ATTR]: index }}
            onClick={this.handleSuggestionClick}
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
