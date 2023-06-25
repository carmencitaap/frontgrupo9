import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Test {
  id: number;
  number_of_questions: number;
  evaluation: number;
  master_test: boolean;
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
    return <p className='margin'>Loading...</p>;
  }


  const handleClick = (id: any) => {
    window.location.replace(`https://main--dapper-caramel-e0264c.netlify.app/test/${id}`);
  };

  const createTest = async (id: any) => {
    await fetch(TESTS_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
            evaluation: id
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    console.log("TEST CREATED",id)
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
                {test.master_test && (
                    <button key='start-button' className="button-18 margin" onClick = {(event) => {handleClick(test.id); createTest(test.evaluation)}}>Start </button>
                )}
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default GetTests;