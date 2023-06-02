import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <span className="home-title">Evaluation App</span>
        {/* <a href="#" > Grupos </a>
        <a href="#"> Evaluaciones </a> */}
      </div>



      <div className="main">
        <div className="container">
          <div>
            <span className="group-title"> Groups </span>
              <div className="groups">
                  <div> Group 1 </div>
                  <div> Group 2 </div>
              </div>
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default App;
