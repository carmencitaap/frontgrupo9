import React, {useState , useEffect} from 'react';
// import PopupGfg from './Popup';
import Popup from 'reactjs-popup';
import CreateButton from '../components/Button';

const GROUP_ENDPOINT = "https://cavenpal.pythonanywhere.com/group/"
const PERSON_ENDPOINT = "https://cavenpal.pythonanywhere.com/person/add_person/"


function GetGroups() {
    const [groups, setGroups] = useState([]);
    const [people, setPeople] = useState([]);

    const getGroups = () => {
        fetch(GROUP_ENDPOINT, {method:'GET'})
        .then((response) => response.json())
        .then(data => {
            setGroups(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
      }
      useEffect (() => {
        getGroups()   
      }, [])
    
    const addGroup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
      
        const name = (document.getElementById('name') as HTMLInputElement).value;

        await fetch(GROUP_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                name: name
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        console.log(name)
    };

    const addPerson = async (id: any) => {
        const full_name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;

        await fetch(PERSON_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                full_name: full_name,
                email: email,
                group: id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        console.log(full_name,email)
    };

    const deleteGroup = async (id: any) => {
        await fetch(GROUP_ENDPOINT+id+"/", {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 200) {
                setGroups(
                    groups.filter((group) => {
                        return group['id'] !== id;
                 })
              );
            } else {
                return "Couldn't delete group.";
            }
        });
    };

    useEffect(() => {
        getGroups();
      }, []);
    
    //const [people, setPeople] = useState([]);
    const getPeople = async (id: any) => {
        await fetch(GROUP_ENDPOINT+id+"/get_people/", {
            method: 'GET',
        })
        .then((response) => response.json())
        .then(data => {
            setPeople(data.people)
        })
        .catch((err) => {
            console.log(err.message)
        })
    }


    return (
            <div className="groups">
                <div id="group-create" className='group-create'>
                <Popup trigger={<img src="plus-solid.svg" alt="" className="margin"/>}
                position="right center">
                    <div className="popup">
                        <span className="group-popup"> Create a group! </span>
                        <form onSubmit={addGroup}>
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" name="name" /><br />

                            <CreateButton />
                        </form>
                    </div>
                </Popup>
                </div>
                

            {groups.map(group => (
                <div key={group['id']}>
                    <span> Group ID: {group['id']}</span>
                    <br />
                    <span> Name: {group['name']} </span>
                    <br />
                    <span> Number of people: {group['number_of_people']} </span>
                    <br />
                    <Popup trigger={<img src="user-plus-solid.svg" alt=""/>}
                    position="right center">
                        <div className="popup">
                            <span className="person-popup"> Create a person! </span>
                            <form onSubmit={()=>addPerson(group['id'])}>
                                <label htmlFor="name"> Full Name: </label>
                                <input type="text" id="name" name="name" /><br />

                                <label htmlFor="email">Email: </label>
                                <input type="text" id="email" name="email" /><br />

                                <CreateButton />
                            </form>
                        </div>
                    </Popup>

                    
                    <Popup  trigger={<img src="users-solid.svg" alt="" className ="popup2" />} position="right center" onOpen={() => getPeople(group['id'])}>
                    <div className="popup">
                        <span className="person-popup"> Persons of the group </span>
                        {people.length > 0 ? (
                        <table className="people">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                            </tr>
                            </thead>
                            <tbody>
                            {people.map(person => (
                                <tr key={person['id']}>
                                <td>{person['id']}</td>
                                <td>{person['full_name']}</td>
                                <td>{person['email']}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        ) : (
                        <p>No people available.</p>
                        )}
                    </div>
                    </Popup>
                    <button className='delete-btn' onClick={()=> deleteGroup(group['id'])}> <img src="trash-full-svgrepo-com.svg" alt="trash" /></button>
                </div>
            ))}
        </div>
    );
}

export default GetGroups;
