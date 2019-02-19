import React, { Component } from "react";
import Search from "./Search";
import SuggestionBox from "./Suggestion";
import PropTypes from "prop-types";
import "./SearchBox.css";

class SearchBox extends Component {
  static propTypes = {
    search: PropTypes.func.isRequired,
    query: PropTypes.string,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func
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
    clearTimeout(this.hideTimer);
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
        this.selectIndex(this.state.suggestionIndex);
        break;
      default:
        break;
    }
  };

  handleFocus = () => {
    clearTimeout(this.hideTimer);
    this.setState({
      suggestionVisible: true
    });
  };

  handleBlur = () => {
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
    this.selectIndex(suggestionIndex);
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

  selectIndex = index => {
    if (index === -1) {
      this.submit(this.state.query);
      return;
    }

    const selectedQuery = this.state.suggestions[index].value;

    this.setState(
      {
        suggestionIndex: -1,
        userQuery: selectedQuery,
        query: selectedQuery,
        suggestions: []
      },
      () => {
        this.submit(this.state.query);
      }
    );
  };

  submit = query => {
    this.props.onSubmit && this.props.onSubmit(query);
  };

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
          onSubmit={this.submit}
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
