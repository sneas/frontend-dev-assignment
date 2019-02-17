import React, { Component } from 'react';
import Search from './Search';
import * as api from '../utils/api';
import SuggestionBox from './SuggestionBox';

class App extends Component {
  state = {
    query: '',
    suggestions: [],
    suggestionIndex: -1,
  }

  handleQueryChange = (query) => {
    this.setState({query});

    if (query.length < 2) {
      this.setState({suggestions: []});
      return;
    }

    api.search(query).then(res => {
      this.setState({
        suggestions: res.suggestions.map(suggestion => suggestion.searchterm)
      });
    });
  }

  handleKeyDown = (e) => {
    const code = e.nativeEvent.keyCode;

    switch (code) {
      case 27:
        this.hideSuggestion();
        break;
      case 40:
        this.increaseSuggestionIndex();
        break;
      case 38:
        this.decreaseSuggestionIndex();
    }
  }

  handleKeyUp = (e) => {

  }

  hideSuggestion() {
    this.setState({suggestions: [], suggestionIndex: -1});
  }

  increaseSuggestionIndex() {
    this.setState(prev => ({
      suggestionIndex: prev.suggestionIndex + 1 < prev.suggestions.length ? prev.suggestionIndex + 1 : -1
    }))
  }

  decreaseSuggestionIndex() {
    this.setState(prev => ({
      suggestionIndex: prev.suggestionIndex === 0 ? prev.suggestions.length - 1 : prev.suggestionIndex - 1
    }))
  }

  render() {
    let searchValue = this.state.query;

    if (this.state.suggestionIndex > -1) {
      searchValue = this.state.suggestions[this.state.suggestionIndex];
    }

    return (
      <div className="container pt-1">
        <Search value={searchValue}
                onChange={this.handleQueryChange}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
        />
        {this.state.suggestions.length > 0 && (
            <SuggestionBox list={this.state.suggestions}
                           index={this.state.suggestionIndex}
            />
        )}
      </div>
    );
  }
}

export default App;
