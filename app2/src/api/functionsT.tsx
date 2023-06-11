import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Test {
  id: number;
  name: string;
  number_of_questions: number;
  evaluation_id: number;
}

function GetTests() {
  const [tests, setTests] = useState<Test[]>([]);
  const { evaluationId } = useParams<{ evaluationId: string }>();
  const TESTS_ENDPOINT = 'https://cavenpal.pythonanywhere.com/tests/';

  const getTests = () => {
    fetch(TESTS_ENDPOINT)
    .then((response) => response.json())
    .then(data => {
        console.log(data);
        const numEvaluationId = Number(evaluationId)
        const testsWithEvaluationId = data.filter((test: Test) => test.evaluation_id === numEvaluationId);
        setTests(testsWithEvaluationId)
      })
    .catch((err) => {
        console.log(err.message)
    })
  }
  
  useEffect (() => {
    getTests()
  }, [])

  if (tests.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {tests.map((test) => (
        <div key={test.id}>
          <h2>Test ID: {test.id}</h2>
          <h2>Test Name: {test.name}</h2>
          <p>Number of Questions: {test.number_of_questions}</p>
        </div>
      ))}
    </div>
  );
}

export default GetTests;