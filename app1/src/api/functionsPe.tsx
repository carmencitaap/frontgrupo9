import React, { useState, useEffect } from "react";
import Popup from 'reactjs-popup';
import CreateButton from "../components/Button";

const PERSON_ENDPOINT = "https://cavenpal.pythonanywhere.com/person/"

function GetPerson() {
    const [people, setPerson] = useState([]);

    const getPerson = () => {
        fetch(PERSON_ENDPOINT)
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
        const group_id = (document.getElementById('group_id') as HTMLInputElement).value;

        await fetch(PERSON_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                last_name: last_name,
                email: email,
                group_id: group_id
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
                        <span className="person-popup"> Create a person! </span>
                        <form onSubmit={addPerson}>
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" name="name" /><br />

                            <label htmlFor="lname">Last Name: </label>
                            <input type="text" id="lname" name="lname" /><br />

                            <label htmlFor="email">Email: </label>
                            <input type="text" id="email" name="email" /><br />

                            <label htmlFor="group_id">Group: </label>
                            <input type="text" id="group_id" name="group_id" /><br />

                            <CreateButton />
                        </form>
                    </div>
                </Popup>
            </div>
            <table className="people">
                <thead>
                    <tr>
                        <th> Number </th>
                        <th> Full Name </th>
                        <th> Email </th>
                    </tr>
                </thead>
                <tbody>
                {people.map(person => (
                    <tr key={person['id']}>
                        <td> {person['id']} </td>
                        <td> {person['full_name']} </td>
                        <td> {person['email']} </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GetPerson;