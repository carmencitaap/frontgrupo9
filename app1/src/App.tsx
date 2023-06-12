import React from 'react';
import './static/App.css';
import Group from './components/Group'
import Evaluation from './components/Evaluation';
//import Person from './components/Person';
import Question from './components/Question'
import Test from './components/Test';

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
          <div className="conteiner_groups">
            <Group />
          </div>
          <div className="conteiner_evaluations">
            <Evaluation />
            {/* <div className="conteiner_tests">
              <Test />
              <div className="conteiner_qustion">
                <Question />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
