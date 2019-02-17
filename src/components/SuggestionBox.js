import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './SuggestionBox.css'

class SuggestionBox extends Component {
  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.string),
    index: PropTypes.number,
  }

  static defaultProps = {
    list: [],
    index: -1,
  }

  render() {
    return (
        <ul className="suggestion-box">
          {this.props.list.map((item, index) => (
              <li key={index + item}
                  className={'suggestion-box__item' + (index === this.props.index ? ' suggestion-box__item--selected' : '')}>{item}</li>
          ))}
        </ul>
    );
  }
}

export default SuggestionBox;
