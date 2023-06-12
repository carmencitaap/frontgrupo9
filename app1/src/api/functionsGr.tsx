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

    const deletePerson = async (id: any) => {
        await fetch("https://cavenpal.pythonanywhere.com/person/"+id+"/delete_person/",{
            method: 'DELETE',
        })
        .then((response) => {
            if (response.status === 200) {
                setPeople(
                    people.filter((people) => {
                        return people['id'] !== id;
                 })
              );
            } else {
                return "Couldn't delete this person.";
            }
        });
    };


    return (
            <div className="groups">
                <div id="group-create" className='group-create'>
                <Popup trigger={<img src="plus-solid.svg" alt="" className="margin"/>}
                position="right center">
                    <div className="popup">
                        <div className="group-popup"> Create a group! </div>
                        <form onSubmit={addGroup}>
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" name="name" /><br />

                            <label htmlFor="avatar">Avatar: </label>
                            <input type="file" id="avatar" name="avatar" accept="image/*" /><br />

                            <CreateButton />
                        </form>
                    </div>
                </Popup>
                </div>
                

            {groups.map(group => (
                <div className='card-group' key={group['id']}>
                    <div className="image-card-group">
                        <img src={group['avatar']} alt="" className="image-group" />
                    </div>
                    <div className="content-card-group">
                    <div className='Name-group-card'> Name: {group['name']} </div>
                    <div> Group ID: {group['id']}</div>
                    <div> Number of people: {group['number_of_people']} </div>
                    <br />
                    
                    <Popup trigger={<img src="user-plus-solid.svg" alt=""/>}
                    position="right center">
                        <div className="popup">
                            <div className="person-popup"> Create a person! </div>
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
                        <div className="person-popup"> Persons of the group </div>
                        {people.length > 0 ? (
                        <table className="people">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Full Name</th>
                                <th>Email</th>
                                <th>D</th>
                            </tr>
                            </thead>
                            <tbody>
                            {people.map(person => (
                                <tr key={person['id']}>
                                <td>{person['id']}</td>
                                <td>{person['full_name']}</td>
                                <td>{person['email']}</td>
                                <td><button className='delete-btnP' onClick={()=> deletePerson(person['id'])}> <img src="trash-full-svgrepo-com.svg" alt="trash" /></button></td>
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
                    
                </div>
            ))}
        </div>
    );
}

export default GetGroups;
