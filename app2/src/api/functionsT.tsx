import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Test {
  id: number;
  number_of_questions: number;
  evaluation: number;
}

function GetTests() {
  const [tests, setTests] = useState<Test[]>([]);
  const { evaluationId } = useParams<{ evaluationId: string }>();
  const TESTS_ENDPOINT = 'https://cavenpal.pythonanywhere.com/test/';

  
  useEffect (() => {
    fetch(TESTS_ENDPOINT)
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        setTests(data)
      })
    .catch((err) => {
        console.log(err.message)
    })
  }, [evaluationId])


  if (tests.length === 0) {
    return <p>Loading...</p>;
  }


  const handleClick = (id: any) => {
    window.location.replace(`http://localhost:3000/test/${id}`);
  };


  return (
    <div>
      {tests.map((test) => {

        if (test.evaluation === Number(evaluationId)) {
          return (
            <div>
              <div key={test.id} className='margin hide'>
                <span>Test Number {test.id}</span> <br />
                <span>Evaluation id: {test.evaluation}</span> <br/>
                <span>Number of Questions: {test.number_of_questions}</span>
              </div>

              <button key='start-button' className="button-21 margin" onClick={()=>handleClick(test.id)}> Start </button>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default GetTests;