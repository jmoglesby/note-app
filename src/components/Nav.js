import React, { Component } from 'react';

class Nav extends Component {
  render() {
    const { toggleNote, showNote, goHome, closeTagForm } = this.props;

    return (
      <div className="nav-container" onClick={() => closeTagForm()}>
        <div className="nav-logo" onClick={() => goHome()}>
          Notes
        </div>
        <div className="nav-button" onClick={() => toggleNote()}>
          { showNote ? 'Cancel' : '+ Note' }
        </div>
      </div>
    );
  }
}

export default Nav;
