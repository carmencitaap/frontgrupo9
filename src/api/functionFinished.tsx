import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

interface AnsweredTest {
    id: number;
    test: number;
    evaluation: number;
    person: number;
    score: number;
}


function GetScore() {
    const ANSWEREDTEST_ENDPOINT = "https://cavenpal.pythonanywhere.com/answeredtest/";
    const {personId} = useParams();
    const {testId} = useParams();
    const [answeredTests ,setAnsweredTests] = useState<AnsweredTest[]>();
    const [answeredTest ,setAnsweredTest] = useState<AnsweredTest>();
  
    useEffect(() => {
      // Fetch the score for the answered test from the API
      fetch(ANSWEREDTEST_ENDPOINT)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAnsweredTests(data);
        })
        .catch(error => console.log(error));
    }, []);

    const getAnsweredTest = () => {
        const answeredTest = answeredTests?.find(answeredTest => answeredTest.person === Number(personId) && answeredTest.test === Number(testId));
        setAnsweredTest(answeredTest);
    }
    useEffect(() =>{
      getAnsweredTest();
    })

    // useEffect(() =>{
    //   if(answeredTest){
    //     fetch(`${ANSWEREDTEST_ENDPOINT}${answeredTest?.id}/`, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         test: Number(answeredTest.test),
    //         evaluation: Number(answeredTest.evaluation),
    //         person: Number(answeredTest.person),
    //         score: floatScore
    //       }),
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('Success:', data);
    //       setAnsweredTest(data);
    //     })
    //     .catch((error) => console.log(error));
    //   }
    // })
  
    return (
      <div>
        <span>Your score: {answeredTest?.score}</span>
      </div>
    );
  }
  
  export default GetScore;