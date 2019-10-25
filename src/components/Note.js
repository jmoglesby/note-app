import React, { Component } from 'react';

class Note extends Component {
  render() {
    const { note } = this.props;
    return (
      <div className="note-container">
        <div>{note.title}</div>
        <div>{note.content}</div>
      </div>
    );
  }
}

export default Note;
