import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';
import Note from './components/Note';
import Flash from './components/Flash';
import urlFor from './helpers/urlFor';

class App extends Component {

  constructor() {
    super();
    this.state = {
      showNote: false,
      notes: [],
      note: {},
      newTag: false,
      error: ''
    };
  }

  resetError = () => {
    this.setState({ error: '' });
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
      .catch( (err) => {
        const { errors } = err.response.data;
        if (errors.content) {
          this.setState({ error: 'Missing note content!' });
        } else if (errors.title) {
          this.setState({ error: 'Missing note title!' });
        }
      });
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

  closeTagForm = () => {
    this.setState({ newTag: false });
  }

  submitTag = (data, id) => {
    axios.post( urlFor(`notes/${id}/tags`), data )
      .then( (res) => this.getNote(id) )
      .catch( (err) => {
        const { errors } = err.response.data;
        if (errors.name) {
          this.setState({ error: 'Tag missing name!' });
        }
      });
  }

  deleteTag = (noteId, tagId) => {
    axios.delete( urlFor(`tags/${tagId}`) )
      .then( (res) => this.getNote(noteId) )
      .catch( (err) => console.log(err.response.data) );
  }

  render() {
    const { showNote, notes, note, newTag, error } = this.state;

    return (
      <div className="App">
        <Nav toggleNote={this.toggleNote} showNote={showNote} />
        {error && <Flash error={error} resetError={this.resetError} />}
        {showNote ?
          <Note
            note={note}
            submitNote={this.submitNote}
            newTag={newTag}
            showTagForm={this.showTagForm}
            closeTagForm={this.closeTagForm}
            submitTag={this.submitTag}
            deleteTag={this.deleteTag}
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
