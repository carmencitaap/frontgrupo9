import React, {useState, useEffect } from 'react'


const EVALUATION_ENDPOINT = "https://cavenpal.pythonanywhere.com/evaluation/"
function GetEvaluations() { 
    const [activeEvaluations, setActiveEvaluations] = useState([]);


    const getActiveEvaluations = ()  => {
        fetch(EVALUATION_ENDPOINT+'get_active_evaluations/')
        .then((response) => response.json())
        .then(data => {
            setActiveEvaluations(data);
            console.log("active evaluations",data);
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        getActiveEvaluations()
    })

    return (
        <div>
            {activeEvaluations.map(ev => (
                <div>
                    <div> Is active? {ev['is_active'] ? "Yes" : "No" } </div>
                    <div> Group {ev['group']} </div>
                    <div> Due date: {ev['due_date']}</div>
                </div>
            ))}
        </div>
    )
}

export default GetEvaluations;