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
      notes: [],
      note: {},
      newTag: false
    };
  }

  getNotes = () => {
    axios.get(urlFor('notes'))
      .then( (res) => this.setState({ notes: res.data }) )
      .catch( (err) => console.log(err.response.data) );
  }

  getNote = (id) => {
    axios.get(urlFor(`notes/${id}`))
      .then( (res) => this.setState({ note: res.data, showNote: true }) )
      .catch( (err) => console.log(err.response.data) );
  }

  submitNote = (data, id) => {
    this.performSubmissionRequest(data, id)
      .then( (res) => this.setState({ showNote: false, note: {} }) )
      .catch( (err) => console.log(err.response.data) );
  }

  performSubmissionRequest = (data, id) => {
    if (id) {
      return axios.patch( urlFor(`notes/${id}`), data );
    } else {
      return axios.post( urlFor('notes'), data );
    }
  }

  deleteNote = (id) => {
    const newNotesState = this.state.notes.filter( (note) => note.id !== id );

    axios.delete( urlFor(`notes/${id}`) )
      .then( (res) => this.setState({ notes: newNotesState }) )
      .catch( (err) => console.log(err.response.data) );
  }

  toggleNote = () => {
    this.setState({
      showNote: ! this.state.showNote,
      note: {}
    });
  }

  showTagForm = () => {
    this.setState({ newTag: true });
  }

  render() {
    const { showNote, notes, note, newTag } = this.state;

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
        { showNote ?
          <Note
            note={note}
            submitNote={this.submitNote}
            newTag={newTag}
            showTagForm={this.showTagForm}
          /> :
          <List
            getNotes={this.getNotes}
            getNote={this.getNote}
            notes={notes}
            deleteNote={this.deleteNote}
          />
        }
      </div>
    );
  }
}

export default App;
