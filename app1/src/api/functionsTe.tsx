import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';

const TEST_ENDPOINT = 'https://cavenpal.pythonanywhere.com/test/';

function GetTests() {
  const [tests, setTests] = useState([]);

  const getTests = () => {
    fetch(TEST_ENDPOINT)
      .then((response) => response.json())
      .then((data) => {
        console.log('data', data);
        setTests(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getTests();
  }, []);

  const addTest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const evaluation = (document.getElementById('evaluation') as HTMLInputElement).value;

    await fetch(TEST_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        evaluation: evaluation,
        master_test: true
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    console.log('fetched ev:', evaluation);

    // Refresh the tests list after adding a new test
    getTests();
  };

  return (
    <div>
      <span className="test-title">Tests</span>
      <Popup
        trigger={<img src="add-row-svgrepo-com.svg" alt="" />}
        position="right center"
      >
        <div className="popup">
          <span className="test-popup">Create a test!</span>
          <form onSubmit={addTest}>
            <label htmlFor="evaluation">Evaluation:</label>
            <input type="text" id="evaluation" name="evaluation" required />
            <br />

            <button type="submit">Create</button>
          </form>
        </div>
      </Popup>
    </div>
  );
}

export default GetTests;
