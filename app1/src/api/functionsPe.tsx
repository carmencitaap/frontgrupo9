import React, { useState, useEffect } from "react";


function GetPerson() {
    const [persons, setPerson] = useState([]);

    const getPerson = () => {
        fetch("https://cavenpal.pythonanywhere.com/person/")
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setPerson(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
      }
      
      useEffect (() => {
        getPerson()
      }, [])

    return (
        <table className="evaluations">
            <thead>
                <tr>
                    <th> Number </th>
                    <th> Name </th>
                    <th> Last Name </th>
                    <th> Email </th>
                </tr>
            </thead>
            <tbody>
            {persons.map(person => (
                <tr>
                    <td> {person['id']} </td>
                    <td> {person['name']} </td>
                    <td> {person['last_name']} </td>
                    <td> {person['email']} </td>
                </tr>
                ))}
            </tbody>
        </table>
            
        
    );
}

export default GetPerson;