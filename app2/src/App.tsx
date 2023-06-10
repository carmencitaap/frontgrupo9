import React from 'react';
import './static/App.css';
import AnswerTest from './components/AnswerTest';

function App() {
  return (
    <div className="App">
      <div className="header">
        <span className="home-title">Answer Evaluation </span>
      </div>
      <div className="main">
        <AnswerTest />
      </div>
    </div>
  );
}

export default App;
