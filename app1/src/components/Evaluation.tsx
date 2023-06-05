import React from 'react';
import GetEvaluations from '../api/functionsEv';

function Evaluation() {
    return (
    <div>
        <span className="evaluations-title"> Evaluations </span>
        <GetEvaluations />
    </div>
    );
}

export default Evaluation;