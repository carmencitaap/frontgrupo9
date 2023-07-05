import React from 'react';
import GetEvaluation from '../api/functionsEv';

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