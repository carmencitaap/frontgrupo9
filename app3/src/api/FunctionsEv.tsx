import React, {useState, useEffect } from 'react'
import { Chart, AxisOptions } from 'react-charts';


const EVALUATION_ENDPOINT = "https://cavenpal.pythonanywhere.com/evaluation/"
function GetEvaluations() { 
    const [activeEvaluations, setActiveEvaluations] = useState([]);


    const getActiveEvaluations = ()  => {
        fetch(EVALUATION_ENDPOINT+'get_active_evaluations/')
        .then((response) => response.json())
        .then(data => {
            setActiveEvaluations(data);
            console.log("active evaluations",data);
        })
        .catch((err) => {
            console.log(err.message)
        })
    }

    useEffect(() => {
        getActiveEvaluations()
    })



    type MyDatum = { date: String, actives: number }
    const data = [
        {
          label: 'React Charts',
          data: [
            {
              date: '31-12-2023',
              actives: activeEvaluations.length,
            },
          ],
        },
      ]
    
      const primaryAxis = React.useMemo(
        (): AxisOptions<MyDatum> => ({
            getValue: datum => datum.date,
            }),
        []
      )
    
      const secondaryAxes = React.useMemo(
        (): AxisOptions<MyDatum>[] => [
          {
            getValue: datum => datum.actives,
            elementType: 'area',
          },
        ],
        []
      )

    return (
        <div>
            <div>
                {activeEvaluations.map(ev => (
                    <div className="card card-1">
                        <div className="card-body">
                            <h3 className='card-title mb-2'> {ev['name']} </h3>
                            <div> Is active? {ev['is_active'] ? "Yes" : "No" } </div>
                            <div> Group {ev['group']} </div>
                            <div> Due date: {ev['due_date']}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='graph'>
            <Chart
                options={{
                    data,
                    primaryAxis,
                    secondaryAxes,
                }}
            /> 
            </div>
        </div>
    )
}

export default GetEvaluations;