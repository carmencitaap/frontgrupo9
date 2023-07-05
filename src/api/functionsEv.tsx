import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GetTests from './functionsT';

function GetEvaluation() {
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [group, setGroup] = useState<Group | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [, setSelectedPerson] = useState<number | null>(null);

  const { evaluationId } = useParams();
  const { personId} = useParams();
  const EVALUATION_ENDPOINT = `https://cavenpal.pythonanywhere.com/evaluation/${evaluationId}/`;
  const GROUP_ENDPOINT = 'https://cavenpal.pythonanywhere.com/group/';
  const PEOPLE_ENDPOINT = 'https://cavenpal.pythonanywhere.com/person/';
 
  // interface GetTestsProps {
  //   testId: number;
  //   personId: number | null; // Update the type of personId prop
  // }

  interface Evaluation {
    id: number;
    name: string;
    group: number;
    creation_date: string;
    due_date: string;
    is_active: boolean;
    test: number;
  }

  interface Group {
    id: number;
    name: string;
    color: string;
    avatar?: string;
    number_of_people: number;
  }

  interface Person {
    id: number;
    name: string;
    last_name: string;
    email: string;
    group: number;
  }

  useEffect(() => {
    const fetchEvaluation = async () => {
      try {
        const response = await fetch(EVALUATION_ENDPOINT);
        if (!response.ok) {
          throw new Error('Failed to fetch evaluation');
        }
        const data = await response.json();
        if (data.id !== undefined && data.name !== undefined) {
          setEvaluation(data);
        } else {
          console.log('Evaluation not found');
        }
      } catch (err: any) {
        console.log('Error:', err.message);
      }
    };

    fetchEvaluation();
  }, [EVALUATION_ENDPOINT, evaluationId]);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        if (evaluation) {
          const response = await fetch(`${GROUP_ENDPOINT}${evaluation.group}/`);
          if (!response.ok) {
            throw new Error('Failed to fetch group');
          }
          const data = await response.json();
          setGroup(data);
        }
      } catch (err: any) {
        console.log('Error:', err.message);
      }
    };

    fetchGroup();
  }, [evaluation]);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        if (group) {
          const response = await fetch(`${GROUP_ENDPOINT}${group.id}/get_people/`);
          if (!response.ok) {
            throw new Error('Failed to fetch people');
          }
          const data = await response.json();
          setPeople(data.people);
        }
      } catch (err: any) {
        console.log('Error:', err.message);
      }
    };

    fetchPeople();
  }, [group]);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        if (people) {
          const response = await fetch(`${PEOPLE_ENDPOINT}${personId}/`);
          if (!response.ok) {
            throw new Error('Failed to fetch person');
          }
          const data = await response.json();
          setSelectedPerson(data);
        }
      } catch (err: any) {
        console.log('Error:', err.message);
      }
    };
    fetchPerson();
  }, [people, personId]);


  // const getPerson = (id: number) => {
  //   const matchingPerson = people.find((p: Person) => p.id === id);

  //   if (matchingPerson) {
  //     setSelectedPerson(matchingPerson.id);
  //   } else {
  //     console.log('Person not found');
  //   }
  // };

  if (evaluation === null || group === null) {
    return <p className="margin">Loading...</p>;
  }

  return (
    <div>
      <div key={evaluationId} className="eval-title" style={{ backgroundColor: group.color }}>
        <div className="evtitle">{evaluation.name}</div>
      </div>

      <div className="instructions">
        <h3>Instructions:</h3>
        <p>You have to answer one question at a time.</p>
        <p>Due date is {evaluation.due_date}.</p>
        <p>Press the button "Start" to begin answering the test.</p>
      </div>
            <br />
      <div>
        <GetTests testId={evaluation.test} personId={personId} color={group.color.substring(1)}/>
      </div>
    </div>
  );
}

export default GetEvaluation;
