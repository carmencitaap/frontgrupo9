import React from 'react';
import './static/App.css';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import EvaluationView from './components/EvaluationView';

function App() {
  return (
    <Router>
      {/* <div className="App">
        <div className="header">
          <span className="home-title">Answer Evaluation </span>
        </div>
      </div> */}

      <Routes>
            <Route path="/evaluation/:evaluationId" element={<EvaluationView />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
