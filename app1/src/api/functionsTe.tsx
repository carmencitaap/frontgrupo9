import React, {useState , useEffect} from 'react';
import CreateButton from '../components/Button';
import Popup from 'reactjs-popup';

const TEST_ENDPOINT = "https://cavenpal.pythonanywhere.com/test/"

function GetTests() {
    const [tests, setTests] = useState([]);

    const getTests = () => {
        fetch(TEST_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setTests(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
      }
      
      useEffect (() => {
        getTests()
      }, [])


    const addTest = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const evaluation = (document.getElementById('evaluation') as HTMLInputElement).value;
        const numberOfQuestions = (document.getElementById('number-of-questions') as HTMLInputElement).value;

        await fetch(TEST_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                evaluation_id: evaluation,
                number_of_questions: numberOfQuestions
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        console.log("fetched:", evaluation, numberOfQuestions)
    };

    return (
        <div>
            <span className="test-title"> Tests </span>
            <Popup trigger={<img src="add-row-svgrepo-com.svg" alt=""/>}
                position="right center">
                    <div className="popup">
                        <span className="test-popup"> Create a test! </span>
                        <form onSubmit={addTest}>
                            <label htmlFor="evaluation"> Evaluation: </label>
                            <input type="text" id="evaluation" name="evaluation" /><br />

                            <label htmlFor="question"> Evaluation: </label>
                            <input type="text" id="question" name="question" /><br />

                            <CreateButton />
                        </form>
                    </div>
                </Popup>
            <table className="Tests">
                <thead>
                    <tr>
                        <th> Number </th>
                        <th> Evaluation </th>
                        <th> number of questions </th>
                    </tr>
                </thead>
                <tbody>
                {tests.map(test => (
                    <tr key={test['id']}>
                        <td> {test['id']} </td>
                        <td> {test['evaluation_id']} </td>
                        <td> {test['number_of_questions']} </td>
                    </tr>
                    ))}
                </tbody>
            </table>
                
        </div>
    );
}

export default GetTests;