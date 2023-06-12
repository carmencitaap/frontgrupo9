import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
const QUESTION_ENDPOINT = "https://cavenpal.pythonanywhere.com/question/"; 

function GetQuestions(){
    const [questions, setQuestions] = useState<Question[]>([]);
    const [test_id, setTestID] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const { testId } = useParams<{ testId: string }>();
    const QUESTIONS_ENDPOINT = `https://cavenpal.pythonanywhere.com/test/${testId}/get_questions/`

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
      }, [QUESTIONS_ENDPOINT, testId])

      const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      };

      if (questions.length === 0) {
        return <p>Loading...</p>;
      }
      const currentQuestion = questions[currentQuestionIndex];
      console.log("holaaa", questions);

      if (test_id !== Number(testId)) {
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

    const handleFinish = (id: any) => {
        window.location.replace("http://localhost:3000/finish");
      };
      return (
        <div key={currentQuestion['id']} className='div-question'>
            <div className='test-title'> <p className="t-title">Answering Test {currentQuestion['test']} </p></div>
            <h3 className="question-statement">{currentQuestion['question']}</h3>
            <p className="margin">Type: {currentQuestion['type_question']}</p>
            <form>
                <label htmlFor="correct-answer" className="answer margin"> Answer: </label> <br/>
                <textarea id="correct-answer" name="correct-answer" className='answer-box margin' cols={40} rows={8}/><br />
            </form>
            <p className="margin">Difficulty: {currentQuestion['difficulty']}</p>
            {currentQuestionIndex < questions.length -1 && (
                <button className="button-21 margin"
                onClick={
                    (event) => {handleNextQuestion(); 
                        createQuestion(currentQuestion['order'],currentQuestion['question'],currentQuestion['difficulty'],currentQuestion['type_question'],currentQuestion['tags_question'],currentQuestion['test'])
                    }}> Next </button>
            )}
            {currentQuestionIndex === questions.length -1 && (
                <button className="button-21 margin" onClick={handleFinish}> Finish </button>
            )}
        </div>
        )
    
}

export default GetQuestions;