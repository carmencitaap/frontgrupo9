import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

interface People {
  full_name: string;
  email: string;
  group: number;
}

interface Props {
  groupId: any;
  evaluationId: any;
}

const Contact: React.FC<Props> = ({ groupId, evaluationId }) => {
  const formRefs = useRef<(HTMLFormElement | null)[]>([]);

  const sendEmail = (e: React.FormEvent, index: number) => {
    e.preventDefault();
    emailjs
      .sendForm("service_svwa1zr", "template_2p3nla3", formRefs.current[index]!, "t9pXTqpliSd60mGJH")
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    if (formRefs.current[index]) {
      formRefs.current[index]!.reset();
    }
  };

  const [people, setPeople] = useState<People[]>([]);
  const GROUP_ENDPOINT = `https://cavenpal.pythonanywhere.com/group/${groupId}/get_people/`;

  useEffect(() => {
    const getPeople = async () => {
      try {
        const response = await fetch(GROUP_ENDPOINT);
        if (!response.ok) {
          throw new Error("Failed to fetch people");
        }
        const data = await response.json();
        console.log("people", data.people);
        setPeople(data.people);
      } catch (err:any) {
        console.log(err.message);
        
        
      }
    };
    getPeople();
  }, [GROUP_ENDPOINT, groupId]);

  const evaluationLink = `https://web2-p3-frontend-grupo9-production.up.railway.app/evaluation/${evaluationId}`;

  return (
    <div>
      {people.map((person, index) => (
        <div key={person.email}>
          <form ref={(el) => (formRefs.current[index] = el)} onSubmit={(e) => sendEmail(e, index)}>
            <input type="hidden" name="user_email" value={person.email} />
            <textarea
              placeholder="Message"
              name="message"
              required
              defaultValue={evaluationLink}
            ></textarea>
            <button type="submit" className="button-21">
              Send to: {person.email}
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default Contact;
