import React, {useState , useEffect} from 'react';
// import PopupGfg from './Popup';
import Popup from 'reactjs-popup';
import CreateButton from '../components/Button';

const GROUP_ENDPOINT = "https://cavenpal.pythonanywhere.com/group/"
const PERSON_ENDPOINT = "https://cavenpal.pythonanywhere.com/person/"


function GetGroups() {
    const [groups, setGroups] = useState([]);
    const getGroups = () => {
        fetch(GROUP_ENDPOINT, {method:'GET'})
        .then((response) => response.json())
        .then(data => {
            // console.log(data);
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
        const number_of_people = (document.getElementById('np') as HTMLInputElement).value;


        await fetch(GROUP_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                number_of_people: number_of_people
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        console.log(name,number_of_people)
    };

    const addPerson = async (id: any) => {
        const full_name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;

        await fetch(PERSON_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify({
                full_name: full_name,
                email: email,
                group_id: id
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        console.log(full_name,email)
    };

    return (
            <div className="groups">
                <div id="group-create">
                <Popup trigger={<img src="plus-solid.svg" alt="" className="margin"/>}
                position="right center">
                    <div className="popup">
                        <span className="group-popup"> Create a group! </span>
                        <form onSubmit={addGroup}>
                            <label htmlFor="name">Name: </label>
                            <input type="text" id="name" name="name" /><br />

                            <label htmlFor="np">Number of people: </label>
                            <input type="text" id="np" name="np" /><br />

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
                </div>
            ))}
        </div>
    );
}

export default GetGroups;


    // const [people, setPeople] = useState([]);
    // const getPeople = (groupId: string | undefined) => {
    //     fetch("https://cavenpal.pythonanywhere.com/group/"+groupId+"/get_people")
    //     .then((response) => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setPeople(data)
    //     })
    //     .catch((err) => {
    //         console.log(err.message)
    //     })
    // }

    // const [person, setPerson] = useState(null);
    // const getPerson = (personId: string | undefined) =>{    
    //     fetch("https://cavenpal.pythonanywhere.com/person/"+personId+"/",{method:'GET'})
    //     .then((response) => response.json())
    //     .then(data => {
    //         console.log(data);
    //         setPerson(data)
    //     })
    //     .catch((err) => {
    //         console.log(err.message)
    //     })
    // }
    
    // useEffect(() => {
    //     getPerson('1')
    // }, [])