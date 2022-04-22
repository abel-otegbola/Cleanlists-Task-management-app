import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faPlusCircle, faTasks } from "@fortawesome/free-solid-svg-icons";
import demoUser from "../../../assets/imgs/demouser.jpg"
import { Doughnut } from 'react-chartjs-2'; 
import "./overview.css"

const Overview = ({ user, tasksArray }) => {
    const [tasksctx, setTasksCtx] = useState()
    const [progress, setProgress] = useState(0)
    const [completed, setCompleted] = useState([])
    const [unfinished, setUnfinished] = useState([])

    useEffect(() => {

        const today = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`
        
       setUnfinished(tasksArray.filter(task => (task.status !== 'completed' && task.createdBy === user && task.date === today)))
       setCompleted(tasksArray.filter(task => (task.status === 'completed' && task.createdBy === user && task.date === today)))

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

       if(tasksctx !== undefined) {
        let overall = tasksctx.datasets[0].data[0] + tasksctx.datasets[0].data[1]
        setProgress((tasksctx.datasets[0].data[0]/overall) * 100)
       }

    }, [setTasksCtx, tasksctx, completed.length, unfinished.length, tasksArray, user])


    return (
        <div className="overview">
            <div className="user-stats">
                <img src={demoUser} width="100" height="100" alt="user"/>
                <div className="info">
                    <h1>{(user !== undefined)? user : "Welcome"}</h1>
                    <p>Hello! you have {unfinished.length} new tasks to finish today</p>
                    <div className="all-tasks">
                        <FontAwesomeIcon icon={faTasks} />
                        <h3>{unfinished.length}</h3>
                    </div>
                    <div className="remaining-tasks">
                        <FontAwesomeIcon icon={faFire} />
                        <h3>{completed.length}</h3>
                    </div>
                </div>
                <div className="chart today">
                        {
                            (tasksctx !== undefined) ?
                                <Doughnut title="traffic-chart" data={tasksctx} options={{ maintainAspectRatio: true }} />
                                :
                                ""
                        }  
                        <h2>{parseInt(progress)}%</h2>
                </div>
            </div>
            <div className="actions">
                <h3>Important <span>{tasksArray.filter(task => task.priority === 'High' && task.createdBy === user).length}</span></h3>
                <h3>completed <span>{tasksArray.filter(task => task.status === 'completed' && task.createdBy === user).length}</span></h3>
                <div className="action-button">
                    <a href="/spaces">Add Space</a>
                    <FontAwesomeIcon icon={faPlusCircle} />
                </div>
                <div className="action-button">
                    <a href="/tasks">Add Task</a>
                    <FontAwesomeIcon icon={faPlusCircle} />
                </div>
            </div>
        </div>
    )
}

export default Overview;