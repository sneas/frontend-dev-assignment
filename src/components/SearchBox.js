import React, { Component } from "react";
import Search from "./Search";
import SuggestionBox from "./Suggestion";
import PropTypes from "prop-types";
import "./SearchBox.css";

const commitSuggestedIndex = suggestedIndex => state => {
  if (suggestedIndex === -1) {
    return {};
  }

  return {
    suggestionIndex: -1,
    userQuery: state.suggestions[suggestedIndex].value,
    query: state.suggestions[suggestedIndex].value,
    suggestions: []
  };
};

class SearchBox extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    query: PropTypes.string,
    onChange: PropTypes.func
  };

  static defaultProps = {
    query: "",
    onChange: () => {}
  };

  state = {
    query: this.props.query,
    userQuery: this.props.query,
    suggestions: [],
    suggestionIndex: -1,
    suggestionVisible: false
  };

  hideTimer;

  componentWillUnMount() {
    clearTimeout(this.hideTimer); //We should always destroy these kind of handlers
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.userQuery !== prevState.userQuery) {
      this.props.onChange(this.state.userQuery);
    }
  }

  handleQueryChange = query => {
    this.setState({ query, userQuery: query, suggestionIndex: -1 });

    if (query.length < 2) {
      this.setState({ suggestions: [] });
      return;
    }

    this.props.search(query).then(suggestions => {
      this.setState({
        suggestions
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
    clearTimeout(this.hideTimer);
    this.setState({
      suggestionVisible: true
    });
  };

  handleBlur = e => {
    // Hide with delay in order to handle suggestion box click
    this.hideTimer = setTimeout(() => {
      this.setState(prev => ({
        suggestionVisible: false,
        query: prev.userQuery,
        suggestionIndex: -1
      }));
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
        query = prev.suggestions[nextIndex].value;
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
        query = prev.suggestions[nextIndex].value;
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
                  suggestions={this.state.suggestions}
                  index={this.state.suggestionIndex}
                  onSelect={this.handleSuggestionSelect}
                  query={this.state.userQuery}
                />
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default SearchBox;
