import React, {useState , useEffect} from 'react';

function GetGroups() {

    const [groups, setGroups] = useState([]);
    const getGroups = () => {
        fetch("https://cavenpal.pythonanywhere.com/group/", {method:'GET'})
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            setGroups(data)
          })
        .catch((err) => {
            console.log(err.message)
        })
      }
      useEffect (() => {
        getGroups()   
      }, [])


    return (
        <div className="groups">
            {/* <div>
                <span>{person !== null && (
                    <span> Name: {person['name']}</span>  
                )}
                </span>
            </div> */}
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



export default GetGroups; 