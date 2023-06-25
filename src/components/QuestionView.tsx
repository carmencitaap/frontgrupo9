import React from 'react';

import GetQuestions from '../api/functionsQ';

function QuestionView(){

    return (
        <div className='question'>
            <GetQuestions />
        </div>
    )
}

export default QuestionView;