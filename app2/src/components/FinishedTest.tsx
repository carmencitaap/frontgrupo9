import React from "react";
import GetScore from "../api/functionFinished";

function FinishedTest(){
    return (
        <div className="finished">
            <h3 className="finished-title">Congratulations!</h3>
            <p>You finished the test.</p>
            <GetScore />
            <img src={process.env.PUBLIC_URL + '/assets/happy-gray-cat-celebration-party-dancing-9qc6ss84qhamexxg.gif'} alt="Cat gif" className="image-size"></img>
        </div>
    )
}

export default FinishedTest;