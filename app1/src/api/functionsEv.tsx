import React, {useState , useEffect} from 'react';


function GetEvaluations() {
    const [evaluations, setEvaluations] = useState([]);

    const getEvaluations = () => {
        fetch("https://cavenpal.pythonanywhere.com/evaluation/")
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

    return (
        <table className="evaluations">
            <thead>
                <tr>
                    <th> Number </th>
                    <th> Name </th>
                    <th> Group </th>
                </tr>
            </thead>
            <tbody>
            {evaluations.map(evaluation => (
                <tr key={evaluation['id']}>
                    <td> {evaluation['id']} </td>
                    <td> {evaluation['name']} </td>
                    <td> {evaluation['group']} </td>
                </tr>
                ))}
            </tbody>
        </table>
            
        
    );
}

export default GetEvaluations;