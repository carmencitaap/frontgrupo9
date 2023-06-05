import React, {useState , useEffect} from 'react';
import Popup from 'reactjs-popup';


function GetEvaluations() {
    const [evaluations, setEvaluations] = useState([]);

    const getEvaluations = () => {
        fetch("https://cavenpal.pythonanywhere.com/evaluation/")
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
        const group = (document.getElementById('group') as HTMLInputElement).value;
        const numberOfQuestions = (document.getElementById('number_questions') as HTMLInputElement).value;
        const isActive = (document.getElementById('is_active') as HTMLInputElement).value;
        
        console.log(isActive);
        
        let activity;
        if (isActive === 'true'){
            activity = true
        }
        else{
            activity = false
        }

        await fetch("https://cavenpal.pythonanywhere.com/evaluation/", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                group: group,
                number_of_questions: numberOfQuestions,
                is_active: activity
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        console.log("fetched:",name,group,numberOfQuestions,isActive)
    };

    return (
        <div>
            <div id="evaluation-create" className="add-img">
                <span className="evaluations-title"> Evaluations </span>
                <Popup trigger ={<img src="add-document-note-svgrepo-com.svg" alt=""/>} position="right center">
                    <div className="popup">
                            <form onSubmit={addEvaluation}>
                                <label htmlFor="name">Name: </label>
                                <input type="text" id="name" name="name" /><br />

                                <label htmlFor="group">Group: </label>
                                <input type="text" id="group" name="group" /><br />

                                <label htmlFor="number_questions">Number of Questions: </label>
                                <input type="text" id="number_questions" name="number_questions" /><br />
                                
                                <label htmlFor="is_active">Is Active?: </label>
                                <select name="is_active" id="is_active">
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select> <br />
        

                                <button type="submit" className='button-34'>Create</button>
                            </form>
                        </div> 
                </Popup>
            </div>
            <table className="evaluations">
                <thead>
                    <tr>
                        <th> Number </th>
                        <th> Name </th>
                        <th> Group </th>
                        <th> Number of questions </th>
                        <th> Is active? </th>
                    </tr>
                </thead>
                <tbody>
                {evaluations.map(evaluation => (
                    <tr key={evaluation['id']}>
                        <td> {evaluation['id']} </td>
                        <td> {evaluation['name']} </td>
                        <td> {evaluation['group']} </td>
                        <td> {evaluation['number_of_questions']} </td>
                        <td> {evaluation['is_active'] ? "Yes": "No"} </td>
                    </tr>
                    ))}
                </tbody>
            </table>
                
        </div>
    );
}

export default GetEvaluations;