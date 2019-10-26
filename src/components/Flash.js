import React, { Component } from 'react';

class Flash extends Component {

  componentDidMount() {
    setTimeout(() => {
      this.props.resetError();
    }, 2000);
  }

  render() {
    return (
      <div className="flash-container">
        {this.props.error}
      </div>
    );
  }
}

export default Flash;
