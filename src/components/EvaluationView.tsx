import React from 'react';
import GetEvaluation from '../api/functionsEv';
import AnswerTest from './AnswerTest';


function EvaluationView() {

  return (
    <div className='begin'>
      <GetEvaluation />
      {/* <AnswerTest /> */}
      {/* <GetQuestions /> */}
    </div>
    
  );
}

export default EvaluationView;