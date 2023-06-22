import React from 'react'
import GetEvaluations from '../api/FunctionsEv';


function GeneralDashboard() {
    return (
        <div>
            <h3 className='dash-title'> Dashboard nº1</h3>
            <div className="card card-1">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-muted">General</h6>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
            </div>
        </div>
    )
}

export default GeneralDashboard;