import React, {useState , useEffect} from 'react';
import Popup from 'reactjs-popup';
import CreateButton from '../components/Button';

const QUESTION_ENDPOINT = "https://cavenpal.pythonanywhere.com/question/"; 

function GetQuestions(){
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
        
        const question = (document.getElementById('question') as HTMLInputElement).value;
        const order = (document.getElementById('order') as HTMLInputElement).value;
        const correct_answer = (document.getElementById('correct-answer') as HTMLInputElement).value;
        const type_question = (document.getElementById('type-question') as HTMLInputElement).value;
        const difficulty = (document.getElementById('difficulty') as HTMLInputElement).value;
        const tags = (document.getElementById('tags') as HTMLInputElement).value;
        const test = (document.getElementById('test') as HTMLInputElement).value;

        await fetch(QUESTION_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                order: order,
                question: question,
                correct_answer: correct_answer,
                type_question: type_question,
                difficulty: difficulty,
                tags_question: tags,
                test_id: test
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        console.log(order,question,correct_answer,type_question,difficulty,tags,test);
    };


    return (
        <div>
            <div id="person-create" className = "add-img">
                <span className="question-title"> Questions </span>
                <Popup trigger={<img src="add-row-svgrepo-com.svg" alt=""/>}
                position="right center">
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
            <table className="questions">
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
                {questions.map(question => (
                    <tr key={question['id']}>
                        <td> {question['id']} </td>
                        <td> {question['question']} </td>
                        <td> {question['correct_answer']} </td>
                        <td> {question['type_question']} </td>
                        <td> {question['difficulty']} </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetQuestions;