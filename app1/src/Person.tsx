import React from "react";
import GetPerson from "./api/functionsPe";

function Person() {
    return (
        <div>
            <span className="people-title"> People </span>
            <GetPerson />
      </div>
    );

}

export default Person;