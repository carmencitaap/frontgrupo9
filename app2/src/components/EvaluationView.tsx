import React, {useState , useEffect} from 'react';
import {useParams} from "react-router-dom";



function GetEvaluation(){
  const [evaluation, setEvaluation] = useState([]);
  const {evaluationId} = useParams()
  const EVALUATION_ENDPOINT = `http://localhost:8000/evaluation/${evaluationId}`

  useEffect(() => {
    fetch(EVALUATION_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEvaluation(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [EVALUATION_ENDPOINT]);

  return (
    <div>
        holaaaa
        
        <p>{evaluation}</p>
    </div>
  )
}

export default GetEvaluation;
