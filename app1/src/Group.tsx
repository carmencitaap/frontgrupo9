import React from 'react';
import GetGroups from './api/getFunctions';


function Group() {
    return (
        <div>
            <span className="group-title"> Groups </span>
            <GetGroups />
      </div>
    );
}

export default Group;