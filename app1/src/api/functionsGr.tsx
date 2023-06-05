import React, {useState , useEffect} from 'react';
// import PopupGfg from './Popup';
import Popup from 'reactjs-popup';
import CreateButton from '../components/Button';

function GetGroups() {

    const [groups, setGroups] = useState([]);
    const getGroups = () => {
        fetch("https://cavenpal.pythonanywhere.com/group/", {method:'GET'})
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
        let people = (document.getElementById('people') as HTMLInputElement).value;
        let people_array = people.split(",")


        await fetch("https://cavenpal.pythonanywhere.com/group/", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                number_of_people: number_of_people,
                people: people_array
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })

        console.log(name,number_of_people,people)
    };

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

                            <label htmlFor="people">People: </label>
                            <input type="text" id="people" name="people" /><br />

                            <CreateButton />
                        </form>
                    </div>
                </Popup>
                </div>
            {groups.map(group => (
                <div key={group['id']}>
                    <span> Name: {group['name']} </span>
                    <br />
                    <span> Number of people: {group['number_of_people']} </span>
                    <br />
                    {/* <span> People: {group['people']} </span> */}
                    <span>
                        People: {(group['people'] as any[]).map((personId) => personId).join(", ")} 
                    </span>
                </div>
                
            ))}


        </div>
    );
}

// function createGroup() {
//     const createGroup = (name, number_of_people, people) => {
//         await fetch("https://cavenpal.pythonanywhere.com/group/", {
//             method: 'GET',
//             body: JSON.stringify({
//                 name: name,
//                 number_of_people: null,
//                 people: []
//             })
//         })
//     }
//  }





export default GetGroups;