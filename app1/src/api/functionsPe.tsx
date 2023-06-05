import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';

function GetPerson() {
    const [people, setPerson] = useState([]);

    const getPerson = () => {
        fetch("https://cavenpal.pythonanywhere.com/person/")
        .then((response) => response.json())
        .then(data => {
            // console.log(data);
            setPerson(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
      }
      
      useEffect (() => {
        getPerson()
      }, [])
    

    const addPerson = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const last_name = (document.getElementById('lname') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;

        await fetch("https://cavenpal.pythonanywhere.com/person/", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                last_name: last_name,
                email: email,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        console.log(name,last_name,email)
    };

    return (
        <div>
            <div id="person-create" className = "add-img">
                <span className="people-title"> People </span>
                <Popup trigger={<img src="user-plus-solid.svg" alt=""/>}
                position="right center">
                    <div className="popup">
                        <form onSubmit={addPerson}>
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" name="name" /><br />

                            <label htmlFor="lname">Last Name: </label>
                            <input type="text" id="lname" name="lname" /><br />

                            <label htmlFor="email">Email: </label>
                            <input type="text" id="email" name="email" /><br />

                            <button type="submit" className='button-34'>Create</button>
                        </form>
                    </div>
                </Popup>
            </div>
            <table className="people">
                <thead>
                    <tr>
                        <th> Number </th>
                        <th> Name </th>
                        <th> Last Name </th>
                        <th> Email </th>
                    </tr>
                </thead>
                <tbody>
                {people.map(person => (
                    <tr key={person['id']}>
                        <td> {person['id']} </td>
                        <td> {person['name']} </td>
                        <td> {person['last_name']} </td>
                        <td> {person['email']} </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetPerson;