import React, {useState , useEffect} from 'react';
import Popup from 'reactjs-popup';
import CreateButton from '../components/Button';


const EVALUATION_ENDPOINT = "https://cavenpal.pythonanywhere.com/evaluation/"

function GetEvaluations() {
    const [evaluations, setEvaluations] = useState([]);

    const getEvaluations = () => {
        fetch(EVALUATION_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setEvaluations(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
      }
      
      useEffect (() => {
        getEvaluations()
      }, [])


    const addEvaluation = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const group_id = (document.getElementById('group_id') as HTMLInputElement).value;
        const numberOfQuestions = (document.getElementById('number_questions') as HTMLInputElement).value;
        const isActive = (document.getElementById('is_active') as HTMLInputElement).value;
        const dueDate = (document.getElementById('due_date') as HTMLInputElement).value;
        
        console.log(isActive);
        
        let activity;
        if (isActive === 'true'){
            activity = true
        }
        else{
            activity = false
        }

        await fetch(EVALUATION_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                group: group_id,
                number_of_questions: numberOfQuestions,
                is_active: activity,
                due_date: dueDate
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        console.log("fetched:",name,group_id,numberOfQuestions,isActive)
    };

    return (
        <div>
            <div id="evaluation-create" className="add-img">
                <span className="evaluations-title"> Evaluations </span>
                <Popup trigger ={<img src="add-document-note-svgrepo-com.svg" alt=""/>} position="right center">
                    <div className="popup">
                    <span className="evaluation-popup"> Create an evaluation! </span>
                            <form onSubmit={addEvaluation}>
                                <label htmlFor="name">Name: </label>
                                <input type="text" id="name" name="name" /><br />

                                <label htmlFor="group_id">Group: </label>
                                <input type="text" id="group_id" name="group_id" /><br />
                                
                                <label htmlFor="is_active">Is Active?: </label>
                                <select name="is_active" id="is_active">
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select> <br />
        
                                <label htmlFor="due_date">Due Date: </label>
                                <input type="date" id="due_date" name="due_date" /><br />

                                <CreateButton />
                            </form>
                        </div> 
                </Popup>
            </div>
            <table className="evaluations">
                <thead>
                    <tr>
                        <th> Number </th>
                        <th> Name </th>
                        <th> Is active? </th>
                    </tr>
                </thead>
                <tbody>
                {evaluations.map(evaluation => (
                    <tr key={evaluation['id']}>
                        <td> {evaluation['id']} </td>
                        <td> {evaluation['name']} </td>
                        <td> {evaluation['is_active'] ? "Yes": "No"} </td>
                    </tr>
                    ))}
                </tbody>
            </table>
                
        </div>
    );
}

export default GetEvaluations;