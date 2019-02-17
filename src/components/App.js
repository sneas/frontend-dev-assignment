import React, { Component } from 'react';
import Search from './Search';
import * as api from '../utils/api';

class App extends Component {
  state = {
    query: '',
  }

  handleQueryChange = (query) => {
    this.setState({query});
    api.search(query).then(res => console.log(res));
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
