import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';

interface Question {
    id: number;
    text: string;
    type_question: string;
    difficulty: string;
    tags_question: string;
    order: number;
    test: number;
  }

  interface TrueFalse{
    id: number;
    question: number;
    correct_answer: boolean;
  }

  interface MultipleChoice{
    id: number;
    question: number;
    correct_answer: string;
    incorrect_answer1: string;
    incorrect_answer2: string;
    incorrect_answer3: string;
  }

  interface SemiOpen{
    id: number;
    question: number;
    correct_answer: string;
    options: string;
  }

  interface Numeric{
    id: number;
    question: number;
    correct_answer: number;
  }

const TRUEFALSE_ENDPOINT = "https://cavenpal.pythonanywhere.com/truefalsequestion/";
const MULTIPLECHOICE_ENDPOINT = "https://cavenpal.pythonanywhere.com/multiplechoicequestion/";
const SEMIOPEN_ENDPOINT = "https://cavenpal.pythonanywhere.com/semiopenquestion/";
const NUMERIC_ENDPOINT = "https://cavenpal.pythonanywhere.com/numericquestion/";
const ANSWEREDQUESTION_ENDPOINT = "https://cavenpal.pythonanywhere.com/answeredquestion/";

function GetQuestions(){
    const [questions, setQuestions] = useState<Question[]>([]);
    const [trueFalse, setTrueFalse] = useState<TrueFalse[]>([]);
  
    const { color } = useParams<{ color: string }>();
    const [multipleChoice, setMultipleChoice] = useState<MultipleChoice[]>([]);
    const [semiOpen, setSemiOpen] = useState<SemiOpen[]>([]);
    const [numeric, setNumeric] = useState<Numeric[]>([]);
    const [test_id, setTestID] = useState();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(1);
    const [answerSemiOpen, setAnswerSemiOpen] = useState<string | null>("");
    const [valueSemiOpen, setValueSemiOpen] = useState<string | null>(null);
    const { testId } = useParams<{ testId: string }>();
    const {personId} = useParams<{ personId: string }>();
    const QUESTIONS_ENDPOINT = `https://cavenpal.pythonanywhere.com/test/${testId}/get_questions/`



    useEffect (() => {
        fetch(QUESTIONS_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setTestID(data.testid)
            setQuestions(data.questions)
          })
        .catch((err) => {
            console.log(err.message)
        })
      }, [QUESTIONS_ENDPOINT, testId])
    

      const getTrueFalse = (questionId: any) => {
        fetch(TRUEFALSE_ENDPOINT)
          .then((response) => response.json())
          .then((data) => {
            setTrueFalse(data);
          })
          .catch((err) => {
            console.log(err.message);
          });
      };
      
      const getNumeric = (questionId: any) => {
        fetch(NUMERIC_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            setNumeric(data)
            
        })
        .catch((err) => {
            console.log(err.message)
        })
      }

      const getMultipleChoice = (questionId: any) => {
        fetch(MULTIPLECHOICE_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            setMultipleChoice(data)
            
        })
        .catch((err) => {
            console.log(err.message)
        })

      }

      const getSemiOpen = (questionId: any) => {
        fetch(SEMIOPEN_ENDPOINT)
        .then((response) => response.json())
        .then(data => {
            setSemiOpen(data)
            
        })
        .catch((err) => {
            console.log(err.message)
        })
      }

      const createAnsweredQuestion = async (correct:boolean,questionId:any,difficulty:any, type_question:any, tags:any,answered_test:any) => {
        await fetch(ANSWEREDQUESTION_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                answered_test: answered_test,
                question: questionId,
                correct: correct,
                difficulty: difficulty,
                type_question: type_question,
                tags_question: tags,
                answered: true,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((err) => {
          console.log(err.message)
        })
        console.log("RESPUESTA A PREGUNTA CREADA",correct, questionId, difficulty, type_question, tags, answered_test);
    };

      const handleNextQuestion = (e: React.FormEvent) => {
        e.preventDefault();
        let correct = false;

        if (currentQuestion?.type_question === "true-false") {
          const formData = new FormData(document.getElementById('yourFormId') as HTMLFormElement);
          const answer = formData.get('truefalse') === 'true';
          const trueFalseQuestion: TrueFalse | undefined = trueFalse.find((question) => question.question === currentQuestion?.id);

          if (trueFalseQuestion) {
            const isAnswerCorrect = answer === trueFalseQuestion.correct_answer;
            if (isAnswerCorrect) {
              correct = true;
            }
          } else {
            console.log("No matching question found in trueFalse array");
          }
          console.log("Selected answer true false:", answer);
        }

        else if (currentQuestion?.type_question === "numeric"){
          const formData = new FormData(document.getElementById('yourFormId') as HTMLFormElement);
          const answer = formData.get('numeric');
          let numericQuestion = numeric.find((question) => question.question === currentQuestion?.id);
          if (answer === numericQuestion?.correct_answer.toString()) {
            correct = true
            setScore((prevScore) => {
              const updatedScore = prevScore + 1;
              return updatedScore;
            });
          }
        }
        else if (currentQuestion?.type_question === "semi-open"){
          // const formData = new FormData(document.getElementById('yourFormId') as HTMLFormElement);
          // const answer = formData.get('semi-open');
          let semiOpenQuestion = semiOpen.find((question) => question.question === currentQuestion?.id);
          if (answerSemiOpen === String(semiOpenQuestion?.correct_answer)) {
            correct = true;
            setScore((prevScore) => {
              const updatedScore = prevScore + 1;
              return updatedScore;
            });
          }

        }
        else if (currentQuestion?.type_question === "alternatives"){
          const formData = new FormData(document.getElementById('yourFormId') as HTMLFormElement);
          const answer = formData.get('alternatives');
          const multipleChoiceQuestion = multipleChoice.find((question) => question.question === currentQuestion?.id);
          console.log("multiple choice question", multipleChoiceQuestion)
          if (answer === String(multipleChoiceQuestion?.correct_answer)) {
            correct = true;
            setScore((prevScore) => {
              const updatedScore = prevScore + 1;
              return updatedScore;
            });
          }
        }
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        createAnsweredQuestion(correct, currentQuestion?.id, currentQuestion?.difficulty, currentQuestion?.type_question, currentQuestion?.tags_question, Number(testId));
      };


      const handleFinish = (e: React.FormEvent) => {
        e.preventDefault();
        let correct = false;
          if (currentQuestion?.type_question === "true-false") {
            const formData = new FormData(document.getElementById('yourFormId') as HTMLFormElement);
            const answer = formData.get('truefalse') === 'true';
        
            let trueFalseQuestion = trueFalse.find((question) => question.question === currentQuestion?.id);
        
            if (String(answer) === String(trueFalseQuestion?.correct_answer)) {
              correct = true;
              setScore((prevScore) => {
                const updatedScore = prevScore + 1;
                return updatedScore;
              });
            }
            console.log("Selected answer true false:", answer);
          }
          else if (currentQuestion?.type_question === "numeric"){
            const formData = new FormData(document.getElementById('yourFormId') as HTMLFormElement);
            const answer = formData.get('numeric');
            let numericQuestion = numeric.find((question) => question.question === currentQuestion?.id);
            
            if (answer === String(numericQuestion?.correct_answer)) {
              correct = true
              setScore((prevScore) => (prevScore + 1));
              // console.log(score)
            }
          }
          else if (currentQuestion?.type_question === "semi-open"){
            // const formData = new FormData(document.getElementById('yourFormId') as HTMLFormElement);
            // const answer = formData.get('semi-open');
            let semiOpenQuestion = semiOpen.find((question) => question.question === currentQuestion?.id);
            if (answerSemiOpen === String(semiOpenQuestion?.correct_answer)) {
              correct = true
              setScore((prevScore) => (prevScore + 1));
              // console.log(score)
            }
          }
          else if (currentQuestion?.type_question === "alternatives"){
            const formData = new FormData(document.getElementById('yourFormId') as HTMLFormElement);
            const answer = formData.get('alternatives');
            const multipleChoiceQuestion = multipleChoice.find((question) => question.question === currentQuestion?.id);
            if (answer === String(multipleChoiceQuestion?.correct_answer)) {
              setScore((prevScore) => (prevScore + 1));
              // console.log(score)
              correct = true
            }
            else{
              correct = false
            }
          }

          createAnsweredQuestion(correct, currentQuestion?.id, currentQuestion?.difficulty, currentQuestion?.type_question, currentQuestion?.tags_question, Number(testId));
          // console.log("out", score)
          const percentageScore = (score/questions.length)*100;
          // console.log(percentageScore)
          console.log("length",questions.length)

          window.location.replace(`https://dapper-caramel-e0264c.netlify.app/finish/${percentageScore}/person/${personId}/`);
          // window.location.replace(`https://dapper-caramel-e0264c.netlify.app/finish/`);
          
        };

        useEffect(() => {
          // eslint-disable-next-line array-callback-return
          questions.map((question) => {
            if (question.type_question === "true-false"){
              getTrueFalse(question.id)
            }
            else if (question.type_question === "alternatives"){
             getMultipleChoice(question.id)
            }
            else if (question.type_question === "semi-open"){
              getSemiOpen(question.id)
            }
            else if (question.type_question === "numeric"){
              getNumeric(question.id)
            }
          })
        }, [questions])
      
        /////////////////////////////////////////////////////////
      if (questions.length === 0) {
        return <p className='margin'>Loading...</p>;
      }
      const currentQuestion = questions[currentQuestionIndex];

      if (test_id !== Number(testId)) {
        return <p>Test invalid</p>;
      }

      return (
        <div key={currentQuestion['id']} className="div-question" >
          <div className="test-title" style={{ backgroundColor: '#'+color }}>
            <div className="t-title">Answering Test {currentQuestion['test']}</div>
            <hr />
            <div className="question-status">
              Question {currentQuestion['order']}/{questions.length}
            </div>
            {/* <div className="question-statement text-center">{currentQuestion['text']}</div> */}
            <hr />
            <span className="text-center-dif">Difficulty: {currentQuestion['difficulty']}</span>
            <span></span>
            <span className="text-center-ty">Type: {currentQuestion['type_question']}</span>
            <div className="content_test">
              <div className="question-statement">{currentQuestion['text']}</div>
            </div>
            
            <div className="infor_answ">
              {currentQuestion['type_question'] === 'true-false' && (
                <form id="yourFormId" className='formpreguntas'>
                <div className="form-check">
                  <input type="radio" className="form-check-input" name="truefalse" id="true" value="true" />
                  <label className="form-check-label" htmlFor="true">True</label>
                </div>
                <div className="form-check2">
                  <input type="radio" className="form-check-input" name="truefalse" id="false" value="false" />
                  <label className="form-check-label" htmlFor="false">False</label>
                </div>
              </form>
              )}
              {currentQuestion['type_question'] === 'numeric' && (
                <div>
                  <form id="yourFormId">
                    <input type="number" placeholder="Ej: 25,3" name="numeric" id="numeric" className="answer-box numeric-input" />
                    
                  </form>
                </div>
              )}
              {currentQuestion['type_question'] === 'semi-open' && (
                <div>
                  <form id="yourFormId">
                    <Autocomplete
                      value={answerSemiOpen}
                      onChange={(event: any, newValue: string | null) => {
                        setAnswerSemiOpen(newValue);
                      }}
                      inputValue={valueSemiOpen || ''}
                      onInputChange={(event, newInputValue) => {
                        setValueSemiOpen(newInputValue);
                      }}
                      id="semi-open"
                      options={semiOpen.find((item) => item.question === currentQuestion.id)?.options.split(",") || []}
                      sx={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </form>
                </div>
              )}
              {currentQuestion['type_question'] === 'alternatives' && (
                  <div>
                    <form id="yourFormId" className='formpreguntas'>
                      <div className="form-check">
                        <input type="radio" className="form-check-input" name="alternatives" id={`MC_correct`} value={multipleChoice.find((item) => item.question === currentQuestion.id)?.correct_answer}/>
                        <label className="form-check-label" htmlFor={`MC_correct`}>
                          {multipleChoice.find((item) => item.question === currentQuestion.id)?.correct_answer}
                        </label>
                      </div>
                      <div className="form-check">
                        <input type="radio" className="form-check-input" name="alternatives" id={`MC_incorrect1`} value={multipleChoice.find((item) => item.question === currentQuestion.id)?.incorrect_answer1}/>
                        <label className="form-check-label" htmlFor={`MC_incorrect1`}>
                          {multipleChoice.find((item) => item.question === currentQuestion.id)?.incorrect_answer1}
                        </label>
                      </div>
                      <div className="form-check">
                        <input type="radio" className="form-check-input" name="alternatives" id={`MC_incorrect2`} value={multipleChoice.find((item) => item.question === currentQuestion.id)?.incorrect_answer2}/>
                        <label className="form-check-label" htmlFor={`MC_incorrect2`}>
                          {multipleChoice.find((item) => item.question === currentQuestion.id)?.incorrect_answer2}
                        </label>
                      </div>
                      <div className="form-check">
                        <input type="radio" className="form-check-input" name="alternatives" id={`MC_incorrect3`} value={multipleChoice.find((item) => item.question === currentQuestion.id)?.incorrect_answer1}/>
                        <label className="form-check-label" htmlFor={`MC_incorrect3`}>
                          {multipleChoice.find((item) => item.question === currentQuestion.id)?.incorrect_answer3}
                        </label>
                      </div>
                    </form>
                  </div>
              )}
            </div>

            {currentQuestionIndex < questions.length - 1 && (
              <button className="button-18 margin btn btn-primary" onClick={(event) => {handleNextQuestion(event);}}>
                Next
              </button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <button className="button-18 margin btn btn-primary" onClick={(event) => handleFinish(event)}>
                Finish
              </button>
            )}
          </div>
        </div>
        )
}

export default GetQuestions;