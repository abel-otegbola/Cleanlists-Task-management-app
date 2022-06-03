import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-solid-svg-icons";
import "./overview.css"

const Overview = ({ user, tasksArray }) => {
    const [tasksctx, setTasksCtx] = useState()
    // const [progress, setProgress] = useState(0)
    const [completed, setCompleted] = useState([])
    const [unfinished, setUnfinished] = useState([])

    useEffect(() => {
        
       setUnfinished(tasksArray.filter(task => (task.status !== 'completed' && task.createdBy === user)))
       setCompleted(tasksArray.filter(task => (task.status === 'completed' && task.createdBy === user)))

       setTasksCtx({
            labels: [],
            datasets: [{
                label: 'Traffic',
                data: [completed.length, unfinished.length],
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                },
                backgroundColor: [
                    'rgba(20, 255, 20, 1)',
                    'rgba(0, 0, 20, 0.1)'
                ],
                borderWidth: 2,
                weight: 0.2
            }]
        })

    //    if(tasksctx !== undefined) {
    //     let overall = tasksctx.datasets[0].data[0] + tasksctx.datasets[0].data[1]
    //     setProgress((tasksctx.datasets[0].data[0]/overall) * 100)
    //    }

    }, [setTasksCtx, tasksctx, completed.length, unfinished.length, tasksArray, user])


    return (
        <div className="overview">
            <div className="user-stats">
                <div className="info">
                    <div className="task">
                        <h3>{completed[0] && completed[0].title}</h3>
                        <p>#{completed[0] && completed[0].space}</p>
                        <div className="duration">
                            <p><FontAwesomeIcon icon={faCalendar} /> {completed[0] && completed[0].date}</p>
                            <p><FontAwesomeIcon icon={faClock} /> {completed[0] && completed[0].deadline}</p>
                        </div>
                    </div>
                    <div className="task">
                        <h3>{unfinished[0] && unfinished[0].title}</h3>
                        <p>#{unfinished[0] && unfinished[0].space}</p>
                        <div className="duration">
                            <p><FontAwesomeIcon icon={faCalendar} /> {unfinished[0] && unfinished[0].date}</p>
                            <p><FontAwesomeIcon icon={faClock} /> {unfinished[0] && unfinished[0].deadline}</p>
                        </div>
                    </div>
                </div>
                {/* <div className="chart today">
                        {
                            (tasksctx !== undefined) ?
                                <Doughnut title="traffic-chart" data={tasksctx} options={{ maintainAspectRatio: true }} />
                                :
                                ""
                        }  
                        <h2>{parseInt(progress)}%</h2>
                </div> */}
            </div>
        </div>
    )
}

export default Overview;