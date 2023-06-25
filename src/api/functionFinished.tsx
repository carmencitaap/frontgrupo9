import React from 'react';
import { useParams } from 'react-router-dom';

function GetScore(){
    const { score } = useParams<{ score: string }>();
    const parsedScore = score ? parseFloat(score) : 0;
    const formattedScore = parsedScore.toFixed(2);

    return (
        <div>Your score: {formattedScore}%</div>
    )
}

export default GetScore