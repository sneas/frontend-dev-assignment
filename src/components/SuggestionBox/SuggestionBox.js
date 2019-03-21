import React from "react";
import PropTypes from "prop-types";
import "./SuggestionBox.css";
import Highlight from "../Highlight/Highlight";
import { setEventParam, getEventParam } from "react-event-param";

const SuggestionBox = ({
  suggestions = [],
  index = -1,
  query = "",
  onSelect = () => {}
}) => {
  const handleSuggestionClick = e => {
    const index = getEventParam(e.target);
    onSelect(index, e);
  };

  return (
    <ul className="suggestion-box">
      {suggestions.map((suggestion, i) => (
        <li
          key={i}
          className={
            "suggestion-box__item" +
            (i === index ? " suggestion-box__item--selected" : "")
          }
          // Set appropriate index attribute.
          // We'll need it for receiving index in onClick handler
          {...setEventParam(i)}
          onClick={handleSuggestionClick}
        >
          <Highlight
            text={suggestion.label}
            highlight={query}
            className="suggestion-box__item-highlight"
          />
        </li>
      ))}
    </ul>
  );
};

SuggestionBox.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.object),
  index: PropTypes.number,
  query: PropTypes.string,
  onSelect: PropTypes.func
};

export default SuggestionBox;
