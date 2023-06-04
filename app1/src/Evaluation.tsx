import React from 'react';

function Evaluation() {
    return (
    <div>
        <span className="evaluations-title"> Evaluations </span>
        <table className="evaluations">
            <thead>
                <tr>
                    <th> Number </th>
                    <th> Name </th>
                    <th> Group </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> 1 </td>
                    <td> Evaluacion 1</td>
                    <td> Grupo 1</td>
                </tr>
                <tr>
                    <td> 2 </td>
                    <td> Evaluacion 2</td>
                    <td> Grupo 2 </td>
                </tr>
                <tr>
                    <td> 3 </td>
                    <td> Evaluacion 3</td>
                    <td> Grupo 3</td>
                </tr>
            </tbody>
        </table>
    </div>
    );
}

export default Evaluation;