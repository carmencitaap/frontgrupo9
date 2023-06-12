import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// interface AllQuestions {
//     test_id: number;
//     questions: [];
// }

function GetQuestions(){
    const [questions, setQuestions] = useState([]);
    const [test_id, setTestID] = useState();
    const { testId } = useParams<{ testId: string }>();
    const QUESTIONS_ENDPOINT = `https://cavenpal.pythonanywhere.com/test/${testId}/get_questions/`

    useEffect (() => {
        fetch(QUESTIONS_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setTestID(data.test_id)
            setQuestions(data.questions)
          })
        .catch((err) => {
            console.log(err.message)
        })
      }, [QUESTIONS_ENDPOINT, testId])

      if (questions.length === 0) {
        return <p>Loading...</p>;
      }
      console.log("holaaa", questions);
      return (
        <div>
            {questions.map((question) => {
                if(test_id === Number(testId)){
                    return (
                        <div key={question['id']} className='div-question'>
                            <h3 className="question-statement">{question['question']}</h3>
                            <p className="margin">{question['type_question']}</p>
                            <p className="margin">{question['difficulty']}</p>
                        </div>
                    )
                }
                return null;
            })}
        </div>
      )
}

export default GetQuestions;