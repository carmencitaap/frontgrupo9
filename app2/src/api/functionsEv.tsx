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
        const response = await fetch(EVALUATION_ENDPOINT+evaluationId+"/");
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

  if (evaluation === null) {
    return <p className='margin'>Loading...</p>;
  }
 
  return (
    <div >
      <div key={evaluationId} className='eval-title'>
        <div className='evtitle'> {evaluation.name} </div>
        <p className='due-date'> Due date is {evaluation.due_date}.</p>
      </div>
    </div>
  )
}

export default GetEvaluation;
