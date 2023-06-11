import React, {useState , useEffect} from 'react';
import{useParams} from "react-router-dom";



function GetEvaluation(){
  const [evaluation, setEvaluation] = useState([]);
  const {evaluationId} = useParams()
  const EVALUATION_ENDPOINT = "https://cavenpal.pythonanywhere.com/evaluation/"

  useEffect (() => {
    fetch(`${EVALUATION_ENDPOINT}${evaluationId}`)
    .then((response) => response.json())
        .then(data => {
            console.log(data);
            setEvaluation(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
  }, [evaluationId]);

  return (
    <div>
      {evaluation.map(ev => (
        <p key={ev['id']}>Evaluation Name: {ev["name"]}</p>
      ))}
    </div>
  )
}


function EvaluationView() {

  return (
    // <div>
    //   <p>Evaluation Name: {evaluationId}</p>
    //   <p>Instructions</p>
    // </div>
    <GetEvaluation />
  );
}

export default EvaluationView;
