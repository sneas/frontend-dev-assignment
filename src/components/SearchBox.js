import React, { Component } from "react";
import Search from "./Search";
import * as api from "../utils/api";
import SuggestionBox from "./Suggestion";
import "./SearchBox.css";

const commitSuggestedIndex = suggestedIndex => state => {
  if (suggestedIndex === -1) {
    return {};
  }

  return {
    suggestionIndex: -1,
    userQuery: state.suggestions[suggestedIndex],
    query: state.suggestions[suggestedIndex],
    suggestions: []
  };
};

class SearchBox extends Component {
  state = {
    query: "",
    userQuery: "",
    suggestions: [],
    suggestionIndex: -1,
    suggestionVisible: false
  };

  handleQueryChange = query => {
    this.setState({ query, userQuery: query, suggestionIndex: -1 });

    if (query.length < 2) {
      this.setState({ suggestions: [] });
      return;
    }

    api.search(query).then(res => {
      this.setState({
        suggestions: res.map(suggestion => suggestion.searchterm)
      });
    });
  };

  handleKeyDown = e => {
    const code = e.keyCode;

    switch (code) {
      case 27:
        this.resetSuggestionIndex();
        break;
      case 40:
        e.preventDefault();
        this.increaseSuggestionIndex();
        break;
      case 38:
        e.preventDefault();
        this.decreaseSuggestionIndex();
        break;
      case 13:
        this.commitSelectedIndex();
        break;
      default:
        break;
    }
  };

  handleKeyUp = e => {};

  handleFocus = e => {
    this.setState({
      suggestionVisible: true
    });
  };

  handleBlur = e => {
    // Hide with delay in order to handle suggestion box click
    setTimeout(() => {
      this.setState({
        suggestionVisible: false
      });
    }, 400);
  };

  handleSuggestionSelect = suggestionIndex => {
    this.setState(prev => {
      return commitSuggestedIndex(suggestionIndex)(prev);
    });
  };

  increaseSuggestionIndex() {
    this.setState(prev => {
      let nextIndex = prev.suggestionIndex + 1;
      let query = prev.userQuery;

      if (nextIndex < prev.suggestions.length) {
        query = prev.suggestions[nextIndex];
      } else {
        nextIndex = -1;
      }

      return {
        query,
        suggestionIndex: nextIndex
      };
    });
  }

  decreaseSuggestionIndex() {
    this.setState(prev => {
      let nextIndex = prev.suggestionIndex - 1;
      let query = prev.userQuery;

      if (nextIndex >= 0) {
        query = prev.suggestions[nextIndex];
      } else if (nextIndex < -1) {
        nextIndex = prev.suggestions.length - 1;
      }

      return {
        query,
        suggestionIndex: nextIndex
      };
    });
  }

  resetSuggestionIndex() {
    this.setState(prev => ({
      suggestionIndex: -1,
      query: prev.userQuery
    }));
  }

  commitSelectedIndex() {
    this.setState(prev => {
      const { suggestionIndex } = prev;
      return commitSuggestedIndex(suggestionIndex)(prev);
    });
  }

  render() {
    let searchValue = this.state.query;

    if (this.state.suggestionIndex > -1) {
      searchValue = this.state.suggestions[this.state.suggestionIndex];
    }

    return (
      <div className="search-box">
        <Search
          value={searchValue}
          onChange={this.handleQueryChange}
          onKeyDown={this.handleKeyDown}
          onKeyUp={this.handleKeyUp}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {this.state.suggestionVisible &&
          this.state.suggestions.length > 0 && (
            <div className="search-box__suggestion-container">
              <div className="search-box__suggestion">
                <SuggestionBox
                  list={this.state.suggestions}
                  index={this.state.suggestionIndex}
                  onSelect={this.handleSuggestionSelect}
                />
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default SearchBox;
