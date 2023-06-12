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
        const isActive = (document.getElementById('is_active') as HTMLInputElement).value;
        const dueDate = (document.getElementById('due_date') as HTMLInputElement).value;
        const group = (document.getElementById('group') as HTMLInputElement).value;
        //console.log(isActive);
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
                group: group,
                is_active: activity,
                due_date: dueDate
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        console.log("fetched:",name, group, isActive)
    };

    const deleteEvaluation = async (id: any) => {
        await fetch(EVALUATION_ENDPOINT+id+'/', {
            method: 'DELETE',
        })
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }


    return (
        <div className='evaluations'>
            <div id="evaluation-create" className="add-img">
                <span className="evaluations-title"> Evaluations </span>
                <Popup trigger ={<img src="add-document-note-svgrepo-com.svg" alt=""/>} position="right center">
                    <div className="popup">
                    <span className="evaluation-popup"> Create an evaluation! </span>
                            <form onSubmit={addEvaluation}>
                                <label htmlFor="name">Name: </label>
                                <input type="text" id="name" name="name" /><br />
                                
                                <label htmlFor="is_active">Is Active?: </label>
                                <select name="is_active" id="is_active">
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </select> <br />
        
                                <label htmlFor="due_date">Due Date: </label>
                                <input type="date" id="due_date" name="due_date" /><br />

                                <label htmlFor="group">Group: </label>
                                <input type="text" id="group" name="group" /><br />

                                <CreateButton />
                            </form>
                        </div> 
                </Popup>
            </div>
            <div className="info_ev">

                {evaluations.map(evaluation => (
                    <div className="card-evaluation" key={evaluation['id']}>
                        <div className='n_ev-card'>N°{evaluation['id']}</div>
                        <div className="dentro-ev-card">  
                            <div className="info_just_ev">
                                <div className='name-ev-card'> Name: {evaluation['name']} </div>
                                <button className='delete-btnE' onClick={()=> deleteEvaluation(evaluation['id'])}> <img src="trash-full-svgrepo-com.svg" alt="trash" /></button> 
                                <div> Is active? {evaluation['is_active'] ? "Yes": "No"} </div>
                                <div> Groups {evaluation['group']} </div>
                                <div> Due date: {evaluation['due_date']} </div>
                            </div>     
                            
                            <div className="info_test_ev">
                                <hr></hr>
                                <div className="title-test-on-ev">Tests:</div>
                            </div>                

                        </div>

                    </div>
                    ))}
                
            </div>
                
        </div>
    );
}

export default GetEvaluations;