import React from 'react';
import './static/App.css';
import Group from './Group'
import Evaluation from './Evaluation';

function App() {
  return (
    <div className="App">
      <div className="header">
        <span className="home-title">Evaluation App</span>
        {/* <a href="#" > Grupos </a>
        <a href="#"> Evaluaciones </a> */}
      </div>

      <div className="main">
        <div className="container">
          <Group />
          <Evaluation />
        </div>
      </div>
    </div>
  );
}

export default App;
