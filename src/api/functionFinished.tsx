import React, {useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';

const ANSWEREDTEST_ENDPOINT = "https://cavenpal.pythonanywhere.com/answeredtest/";

function GetScore() {
    const { score } = useParams();
    // const [score, setScore] = useState(0);
  
    // useEffect(() => {
    //   // Fetch the score for the answered test from the API
    //   fetch(`ANSWEREDTEST_ENDPOINT/${answeredTestId}`)
    //     .then(response => response.json())
    //     .then(data => setScore(data.score))
    //     .catch(error => console.log(error));
    // }, [answeredTestId]);
  
    return (
      <div>Your score: {Number(score).toFixed(2)}%</div>
    );
  }
  
  export default GetScore;