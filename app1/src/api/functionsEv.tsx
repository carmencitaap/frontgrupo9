import React, {useState , useEffect, useRef} from 'react';
import Popup from 'reactjs-popup';
import CreateButton from '../components/Button';
import Test from '../components/Test';
import Question from '../components/Question';
import SendEmail from '../components/sendEmail';
import emailjs from "@emailjs/browser";
import Contact from '../components/sendEmail';

interface Evaluation {
    id: number;
    name: string;
    group: number;
    creation_date: string;
    due_date: string;
    is_active: boolean
  }

const EVALUATION_ENDPOINT = "https://cavenpal.pythonanywhere.com/evaluation/"
const TEST_ENDPOINT = "https://cavenpal.pythonanywhere.com/test/"
const QUESTION_ENDPOINT = "https://cavenpal.pythonanywhere.com/question/"; 

function GetEvaluations() {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const [tests, setTest] = useState([]);
    const [questions, setQuestions] = useState([]);

    const getQuestions = () => {
        fetch(QUESTION_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            // console.log(data);
            setQuestions(data)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        getQuestions()
    })

    const addQuestion = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const order = (document.getElementById('order') as HTMLInputElement).value;
        const question = (document.getElementById('question') as HTMLInputElement).value;
        const correct_answer = (document.getElementById('correct-answer') as HTMLInputElement).value;
        const type_question = (document.getElementById('type-question') as HTMLInputElement).value;
        const difficulty = (document.getElementById('difficulty') as HTMLInputElement).value;
        const tags = (document.getElementById('tags') as HTMLInputElement).value;
        const test = (document.getElementById('test') as HTMLInputElement).value;

        await fetch('https://cavenpal.pythonanywhere.com/question/add_question/', {
            method: 'POST',
            body: JSON.stringify({
                order: order,
                question: question,
                correct_answer: correct_answer,
                type_question: type_question,
                difficulty: difficulty,
                tags_question: tags,
                test: test
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        console.log(order,question,correct_answer,type_question,difficulty,tags,test);
    };
    const deleteQuestion = async (id: any) => {
        await fetch(QUESTION_ENDPOINT+id+"/", {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 200) {
                setQuestions(
                    questions.filter((question) => {
                        return question['id'] !== id;
                 })
              );
            } else {
                return "Couldn't delete question.";
            }
        });
    };



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
        const intGroup = Number(group);
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
                group: intGroup,
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
    const deleteTest = async (id: any) => {    
        await fetch(TEST_ENDPOINT+id+'/', {
            method: 'DELETE',
        })
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }
    interface People{
        full_name: string;
        email: string;
        group: number;
    }

    const getTests = async (id: any) => {  
        await fetch(EVALUATION_ENDPOINT+id+'/get_test/', {
            method: 'GET',
        })

        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setTest(data.test)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    const getQuestionsForTest = async (testId:any) => {
        await fetch(TEST_ENDPOINT + testId + '/get_question/', {
          method: 'GET',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            // Update the questions state with the fetched data
            setQuestions(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
    const handleClick = (testId:any) => {
    // Call the getQuestionsForTest function with the test ID
    getQuestionsForTest(testId);
    };


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
                    <div className="card-evaluation" key={evaluation.id}>
                        <div className='n_ev-card'>N°{evaluation['id']}</div>
                        <div className="dentro-ev-card">  
                            <div className="info_just_ev">
                                <div className='name-ev-card'> Name: {evaluation['name']} </div>
                                <button className='delete-btnE' onClick={()=> deleteEvaluation(evaluation['id'])}> <img src="trash-full-svgrepo-com.svg" alt="trash" /></button> 
                                {/* <button className='shereBtn' onClick={()=> shareTest(evaluation['group_id'], evaluation['id'])}> <img src="share-solid.svg" alt="share" /></button>  */}
                                {/* {evaluation && (<Contact groupId={evaluation['group_id']} evaluationId = {evaluation['id']}/>)} */}
                                <Contact groupId={evaluation['group']} evaluationId={evaluation['id']} />
                                <div> Is active? {evaluation['is_active'] ? "Yes": "No"} </div>
                                <div> Groups {evaluation['group']} </div>
                                <div> Due date: {evaluation['due_date']} </div>
                                <hr></hr>
                            </div>     
                            
                            <div className="info_test_ev">
                                <div className="title-test-on-ev"><Test /></div><button className='btnSeeTest' onClick={() => getTests(evaluation.id)}>
                                    See Tests
                                </button>
                                
                                {tests.length > 0 && tests.map((test) => (
                                    <div className="div2linea">
                                        <div className='test-n-card' key={test['id']}>
                                            <div className="info_test_n_card">
                                                <div> Test: {test['id']} </div>
                                                <div> N°questions: {test['number_of_questions']} </div>
                                                
                                            </div>
                                            <div className="btns_qstn_card_test">
                                                <button className='delete-btnE' onClick={()=> deleteTest(test['id'])}> <img src="trash-full-svgrepo-com.svg" alt="trash" /></button> 
                                                <Popup trigger={<img src="eye-solid.svg" alt="" className='seeQ-btn'/>} onClose={() => setQuestions([])}
                                                    position="left center">
                                                    <table className="popup">
                                                        <thead>
                                                        <tr>
                                                            <th> Number </th>
                                                            <th> Question </th>
                                                            <th> Correct Ans </th>
                                                            <th> Type </th>
                                                            <th> Difficulty </th>
                                                            <th> Delete </th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {questions.map((question) => (
                                                            <tr key={question['id']}>
                                                            <td> {question['id']} </td>
                                                            <td> {question['question']} </td>
                                                            <td> {question['correct_answer']} </td>
                                                            <td> {question['type_question']} </td>
                                                            <td> {question['difficulty']} </td>
                                                            <td>
                                                                <button onClick={() => deleteQuestion(question['id'])} className="delete-btn">
                                                                {' '}
                                                                <img src="trash-full-svgrepo-com.svg" alt="trash" />{' '}
                                                                </button>
                                                            </td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </Popup>
                                                
                                                <Popup trigger={<img src="square-plus-solid.svg" className='addQ-btn' alt=""/>}
                                                position="left center">
                                                    <div className="popup">
                                                        <span className="question-popup"> Create a question! </span>
                                                        <form onSubmit={addQuestion}>
                                                            <label htmlFor="question"> Question: </label>
                                                            <input type="text" id="question" name="question" /><br />

                                                            <label htmlFor="order">Order: </label>
                                                            <input type="text" id="order" name="order" /><br />

                                                            <label htmlFor="correct-answer">Correct Answer: </label>
                                                            <input type="text" id="correct-answer" name="correct-answer" /><br />

                                                            <label htmlFor="type-question"> Type: </label>
                                                            <input type="text" id="type-question" name="type-question" /><br />

                                                            <label htmlFor="difficulty"> Difficulty: </label>
                                                            <input type="text" id="difficulty" name="difficulty" /><br />

                                                            <label htmlFor="tags"> Tags: </label>
                                                            <input type="text" id="tags" name="tags" /><br />

                                                            <label htmlFor="test"> Test: </label>
                                                            <input type="text" id="test" name="test" /><br />

                                                            <CreateButton />

                                                        </form>
                                                    </div>
                                                </Popup>
                                            </div>
                                    </div>
                                    <div className="2para_linea">
                                        <hr></hr>
                                    </div>

                            </div>

                                    
                                ))}    
                                
                            </div>                
                        </div>
                    </div>
                    ))}
            </div>   
        </div>
    );
}

export default GetEvaluations;