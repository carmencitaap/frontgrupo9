import React from 'react';
import './static/App.scss';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EvaluationView from './components/EvaluationView';
import QuestionView from './components/QuestionView';
import FinishedTest from './components/FinishedTest';

function App() {
  return (
    <Router>
      {/* <div className="App">
        <div className="header">
          <span className="home-title">Answer Evaluation </span>
        </div>
      </div> */}
      <Routes>
        <Route path="/finish/" element={<FinishedTest />}/>
      </Routes>

      <Routes>
            <Route path="/evaluation/:evaluationId/person/:personId" element={<EvaluationView />}></Route>
      </Routes>
      <Routes>
        <Route path="/test/:testId/person/:personId/color/:color" element={<QuestionView/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
