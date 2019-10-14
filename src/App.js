import React from 'react';
import './App.css';
import Nav from './components/Nav';
import List from './components/List';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <List />
      </div>
    );
  }
}

export default App;
