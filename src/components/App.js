import React, { Component } from 'react';
import Search from './Search';

class App extends Component {
  state = {
    query: '',
  }

  handleQueryChange = (query) => {
    this.setState({query});
  }

  render() {
    return (
      <div className="container pt-1">
        <Search value={this.state.query} onChange={this.handleQueryChange} />
      </div>
    );
  }
}

export default App;
