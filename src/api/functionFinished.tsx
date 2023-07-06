import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

const ANSWEREDTEST_ENDPOINT = "https://cavenpal.pythonanywhere.com/answeredtest/";

interface AnsweredTest {
    id: number;
    test: number;
    evaluation: number;
    person: number;
    score: number;
}


function GetScore() {
    const { score } = useParams();
    const {personId} = useParams();
    const [answeredTests ,setAnsweredTests] = useState<AnsweredTest[]>();
    const [answeredTest ,setAnsweredTest] = useState<AnsweredTest>();
    // const [score, setScore] = useState(0);
    const floatScore = parseFloat(score?.toString() || "0");
  
    useEffect(() => {
      // Fetch the score for the answered test from the API
      fetch(`ANSWEREDTEST_ENDPOINT/`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setAnsweredTests(data);
        })
        .catch(error => console.log(error));
    }, []);

    const getAnsweredTest = () => {
        const answeredTest = answeredTests?.find(answeredTest => answeredTest.person === Number(personId));
        setAnsweredTest(answeredTest);
    }
    useEffect(() =>{
      getAnsweredTest();
    })

    useEffect(() =>{
      if(answeredTest){
        fetch(`ANSWEREDTEST_ENDPOINT/${answeredTest?.id}/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({score: floatScore}),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setAnsweredTest(data);
        })
        .catch((error) => console.log(error));
      }
    })
  
    return (
      <div>Your score: {Number(score).toFixed(2)}%</div>
    );
  }
  
  export default GetScore;