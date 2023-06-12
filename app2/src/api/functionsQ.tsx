import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

interface Question {
    id: number;
    question: string;
    correct_answer: string;
    type_question: string;
    difficulty: string;
    tags_question: string;
    order: number;
    test: number;
  }
const QUESTION_ENDPOINT = "https://cavenpal.pythonanywhere.com/question/add_question/"; 

function GetQuestions(props: any){
    const [questions, setQuestions] = useState<Question[]>([]);
    const [test_id, setTestID] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [finished,setFinished] = useState(false)
    const [score, setScore] = useState<number>(0);
    const QUESTIONS_ENDPOINT = `https://cavenpal.pythonanywhere.com/test/${props.testId}/get_questions/`

    useEffect (() => {
        fetch(QUESTIONS_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setTestID(data.test_id)
            setQuestions(data.questions)
          })
        .catch((err) => {
            console.log(err.message)
        })
      }, [QUESTIONS_ENDPOINT, props.testId])

      const handleNextQuestion = () => {
        const answer = (document.getElementById('correct-answer') as HTMLInputElement).value;
        if (answer === currentQuestion?.correct_answer) {
          setScore((prevScore) => {
            const updatedScore = prevScore + 1;
            console.log("score", updatedScore);
            console.log("length", questions.length)
            return updatedScore;
          });
        }
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      };

      if (questions.length === 0) {
        return <p className='margin'>Loading...</p>;
      }
      const currentQuestion = questions[currentQuestionIndex];
      console.log("holaaa", questions);

      if (test_id !== Number(props.testId)) {
        return <p>Test invalid</p>;
      }
      
      const createQuestion = async (order:any,question:any,difficulty:any, type_question:any, tags:any,test:any) => {
        
        const correct_answer = (document.getElementById('correct-answer') as HTMLInputElement).value;
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
        console.log("PREGUNTA CREADA",order,question,correct_answer,type_question,difficulty,tags,test);
    };

    const handleFinish = () => {
        const answer = (document.getElementById('correct-answer') as HTMLInputElement).value;
        if (answer === currentQuestion?.correct_answer) {
            console.log("entró")
            setScore((prevScore) => (prevScore + 1));
            console.log(score)
            console.log("length", questions.length)
        }
      };
      const percentageScore = (score/questions.length)*100;
      const formattedScore = percentageScore.toFixed(2);
      
      const handleClick = () => {
        console.log("antes",finished)
        setFinished(true);
        console.log("despues",finished);
      };
      return (
        <div>
          <div key={currentQuestion['id']} className={finished ? 'hide':'div-question'}>
              <div className='test-title'>
                  <div className="t-title">Answering Test {currentQuestion['test']} </div> 
                  <hr />
                  <p className="question-status"> Question {currentQuestion['order']}/{questions.length} </p>
              </div>
              
              <h3 className="question-statement">{currentQuestion['question']}</h3>
              <p className="margin">Type: {currentQuestion['type_question']}</p>
              <form>
                  <label htmlFor="correct-answer" className="answer margin"> Answer: </label> <br/>
                  <textarea id="correct-answer" name="correct-answer" className='answer-box margin' cols={40} rows={8}/><br />
              </form>
              <p className="margin">Difficulty: {currentQuestion['difficulty']}</p>
              {currentQuestionIndex < questions.length -1 && (
                  <button className="button-18 margin"
                  onClick={
                      (event) => {handleNextQuestion(); 
                          createQuestion(currentQuestion['order'],currentQuestion['question'],currentQuestion['difficulty'],currentQuestion['type_question'],currentQuestion['tags_question'],currentQuestion['test'])
                      }}> Next </button>
              )}

              
              {currentQuestionIndex === questions.length -1 && (
                  <button className="button-18 margin" onClick = {(event) => {handleClick(); handleFinish()}}> Finish </button>
              )}
          </div>

          <div className={finished ? "finished": 'hide'}>
            <h3 className="finished-title">Congratulations!</h3>
            <p>You finished the test.</p>
            {/* <GetScore /> */}
            <img src="happy-gray-cat-celebration-party-dancing-9qc6ss84qhamexxg.gif" alt="Cat gif" className="image-size"></img>
            <p className={finished ? '':'hide'}>Your score: {formattedScore}%</p>
          
          </div>
        </div>
        )
    
}

export default GetQuestions;