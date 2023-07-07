import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Test {
  id: number;
  number_of_questions: number;
  master_test: boolean;
}

interface GetTestsProps {
  testId: number;
  personId: any; // Update the type of personId prop
  color : string;
  secondary : string;
}

function GetTests({ testId, personId, color, secondary }: GetTestsProps) {

  const [test, setTest] = useState<Test>({} as Test);
  const [, setColorTest] = useState('' as string);
  const { evaluationId } = useParams<{ evaluationId: string }>();
  const TESTS_ENDPOINT = 'https://cavenpal.pythonanywhere.com/test/';
  const ANSWEREDTEST_ENDPOINT = "https://cavenpal.pythonanywhere.com/answeredtest/";


  useEffect (() => {
    fetch(TESTS_ENDPOINT+testId+"/")
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        setTest(data)
        setColorTest(data.color) 
      })
    .catch((err) => {
        console.log(err.message)
    })
  }, [evaluationId, testId])


  if (test === null) {
    return <p className='margin'>Loading...</p>;
  }


  const handleClick = (testId: any, personId:any, color:any, secondary:any) => {
    window.location.replace(`https://dapper-caramel-e0264c.netlify.app/test/${testId}/person/${personId}/color/${color}/secondary/${secondary}`);
  };

  const createAnsweredTest = async (id: any) => {
    await fetch(ANSWEREDTEST_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
            test: Number(testId),
            evaluation: Number(id),
            person: Number(personId),
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => {
        console.log(err.message)
    })
    console.log("TEST CREATED",id)
};


  return (
    <div>
      <div>
        <div key={testId} className='margin hide'>
          <span>Test Number {testId}</span> <br />
          <span>Evaluation id: {evaluationId}</span> <br/>
          <span>Number of Questions: {test.number_of_questions}</span>
        </div>
          
          <button key='start-button' className="button-18 margin" style={{backgroundColor: `#${secondary}`}} onClick = {(event) => {handleClick(testId,personId,color,secondary); createAnsweredTest(evaluationId)}}>Start </button>
      </div>
    </div>
  );
}

export default GetTests;