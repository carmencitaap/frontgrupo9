import React, {useState , useEffect} from 'react';

function GetQuestions(){
    const [questions, setQuestions] = useState([]);

    const getQuestions = () => {
        fetch("https://cavenpal.pythonanywhere.com/question/")
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

    return (
        <div>
            <span className="question-title"> Questions </span>
            <table className="questions">
                <thead>
                    <tr>
                        <th> Number </th>
                        <th> Question </th>
                        <th> Correct Ans </th>
                        <th> Type </th>
                        <th> Difficulty </th>
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