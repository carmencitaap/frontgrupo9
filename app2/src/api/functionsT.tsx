import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GetQuestions from './functionsQ';

interface Test {
  id: number;
  number_of_questions: number;
  evaluation: number;
  master_test: boolean;
}
// fetch a evluation con ese id
// const TESTS_ENDPOINT = 'https://cavenpal.pythonanywhere.com/evaluation/'
function GetTests() {
  const [tests, setTests] = useState<Test[]>([]);
  const { evaluationId } = useParams<{ evaluationId: string }>();
  const TESTS_ENDPOINT = 'https://cavenpal.pythonanywhere.com/test/';
  const [started,setStarted] = useState(false);
  // console.log("aaantes",started)
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


  const handleClick = () => {
    console.log("antes",started)
    setStarted(true);
    console.log("despues",started);
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
      <div className={started ? 'hide' : 'instructions'}>
        <h3> Instructions: </h3>
        <p> You have to answer one question at a time. </p>
        
        <p> Press the button "Start" to begin answering the test. </p>
      </div>


      {tests.map((test) => {
        if (test.evaluation === Number(evaluationId)) {
          return (
            <div>
                {test.master_test && (
                  <div>
                    <button key='start-button' className={started ? "hide" : "button-18 margin"} onClick = {(event) => {handleClick(); createTest(test.evaluation)}}>Start</button>
                    <div className={started ? "":'hide'}>
                      <GetQuestions testId={test.id} />
                    </div>
                  </div>
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