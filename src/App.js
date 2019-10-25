import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import urlFor from './helpers/urlFor';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showNote: false,
      notes: []
    };
  }

  getNotes = () => {
    axios.get(urlFor('notes'))
      .then( (res) => this.setState({ notes: res.data }) )
      .catch( (err) => console.log(err.response.data) );
  }

  getNote = () => {
    console.log('clicked');
  }

  toggleNote = () => {
    this.setState({
      showNote: ! this.state.showNote
    });
  }

  render() {
    const { showNote, notes } = this.state;

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
        { showNote ? <Note /> : <List getNotes={this.getNotes} getNote={this.getNote} notes={notes} /> }
      </div>
    );
  }
}

export default App;
