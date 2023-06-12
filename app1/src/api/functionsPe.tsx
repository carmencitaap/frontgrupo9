// import React, { useState, useEffect } from "react";
// import Popup from 'reactjs-popup';

// const PERSON_ENDPOINT = "https://cavenpal.pythonanywhere.com/person/"

function GetPerson() {}
//     const [people, setPerson] = useState([]);

//     const getPerson = () => {
//         fetch(PERSON_ENDPOINT)
//         .then((response) => response.json())
//         .then(data => {
//             // console.log(data);
//             setPerson(data)
//           })
//         .catch((err) => {
//             console.log(err.message)
//         })
//       }
      
//       useEffect (() => {
//         getPerson()
//       }, [])
    

//     return (
//         <div>
//             <div className="show-people" id ="show-people">
//                     <Popup trigger={<img src='users-solid.svg' alt='' className='margin'/>} position="right center">
//                         <div className="popup">
//                             <span className="group-popup"> People </span>
//                             <table className="people">
//                                 <thead>
//                                     <tr>
//                                         <th> Number </th>
//                                         <th> Full Name </th>
//                                         <th> Email </th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                 {people.map(person => (
//                                     <tr key={person['id']}>
//                                         <td> {person['id']} </td>
//                                         <td> {person['full_name']} </td>
//                                         <td> {person['email']} </td>
//                                     </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </Popup>
//             </div>
//         </div>
//     );
// }

export default GetPerson;