import PropTypes from "prop-types";
import { escapeRegexpString } from "../utils/regexp";
import Parser from "html-react-parser";

const Highlight = ({ text, highlight, className }) => {
  if (text.length === 0) {
    return null;
  }

  if (highlight.length === 0) {
    return Parser(text);
  }

  const highlightedText = text.replace(
    new RegExp(`(${escapeRegexpString(highlight)})`, "gi"),
    `<span class="${className}">$1</span>`
  );

  return Parser(highlightedText);
};

Highlight.propTypes = {
  text: PropTypes.string.isRequired,
  highlight: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export default Highlight;
