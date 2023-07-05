import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


interface Question {
    id: number;
    text: string;
    type_question: string;
    difficulty: string;
    tags_question: string;
    order: number;
    test: number;
  }

function QuestionsAll() {
    const [, setQuestions] = useState<Question[]>([]);

    const [, setTestID] = useState();
    const { testId } = useParams<{ testId: string }>();
    const QUESTIONS_ENDPOINT = `https://cavenpal.pythonanywhere.com/test/${testId}/get_questions/`

    useEffect (() => {
        fetch(QUESTIONS_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setTestID(data.test_id)
            setQuestions(data.questions)
            // console.log("tipo", data.questions.type_question)
            // if (data.questions.type_question === "true-false"){
            //   getTrueFalse(data.questions.id)
            // }
            // else if (data.questions.type_question === "alternatives"){
            //   getMultipleChoice(data.questions.id)
            // }
            // else if (data.questions.type_question === "semi-open"){
            //   getSemiOpen(data.questions.id)
            // }
            // else if (data.questions.type_question === "numeric"){
            //   getNumeric(data.questions.id)
            // }
          })
        .catch((err) => {
            console.log(err.message)
        })
      }, [QUESTIONS_ENDPOINT, testId])


  return (
    <div>QuestionsAll</div>
  )
}

export default QuestionsAll
