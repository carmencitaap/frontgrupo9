import React, {useState , useEffect} from 'react';
import{useParams} from "react-router-dom";

interface Evaluation {
  id: number;
  name: string;
  group_id: number;
  creation_date: string;
  due_date: string;
  is_active: boolean
}

function GetEvaluation(){
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const {evaluationId} = useParams()
  const EVALUATION_ENDPOINT = "https://cavenpal.pythonanywhere.com/evaluation/"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${EVALUATION_ENDPOINT}${evaluationId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch evaluation');
        }
        const data = await response.json();
        console.log('Fetched data:', data);

        if (data.id !== undefined && data.name !== undefined) {
          setEvaluation(data);
        } else {
          console.log('Evaluation not found');
        }
      } catch (err: any) {
        console.log('Error:', err.message);
      }
    };

    fetchData();

  }, [evaluationId]);

  console.log("holaaa",evaluation)

  if (evaluation === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 key={evaluationId}>Evaluation Name: {evaluation.name}</h2>
      <p>Instrucciones: lalalalala</p>
    </div>
  )
}

export default GetEvaluation;
