import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'; 
import "./history.css"

const History = ({ user, tasksArray }) => {
    const [tasksctx, setTasksCtx] = useState()
    const [progress, setProgress] = useState(0)
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

       if(tasksctx !== undefined) {
        let overall = tasksctx.datasets[0].data[0] + tasksctx.datasets[0].data[1]
        setProgress((tasksctx.datasets[0].data[0]/overall) * 100)
       }

    }, [setTasksCtx, tasksctx, completed.length, unfinished.length, tasksArray, user])


    return (
        <div className="history">
            <h2 className='heading'>History</h2>
            
            <div className='chart-overview'>
                <h3>Completed <span>{tasksArray.filter(element => (element.status === "completed" && element.createdBy === user)).length}</span></h3>
                <h3>Unfinished <span>{tasksArray.filter(element => (element.status !== "completed" && element.createdBy === user)).length}</span></h3>
                <div className="chart">
                        {
                            (tasksctx !== undefined) ?
                                <Doughnut title="traffic-chart" data={tasksctx} options={{ maintainAspectRatio: true }} />
                                :
                                ""
                        }  
                        <h2>{parseInt(progress)}%</h2>
                </div>
            </div>
            <div className='history-box'> 
                <div className='completed'>
                    <h2>Completed</h2>
                    {
                        tasksArray.filter(element => (element.status === "completed" && element.createdBy === user)).map(task => { return (
                            <div key={task.id} className='task'>
                                <h4>{task.title}</h4>
                                <p className={task.priority}>{task.priority}</p>
                                <p>{task.deadline}</p>
                                <p>{task.date}</p>
                                <p className={task.status}>{task.status}</p>
                            </div>
                        )})
                    }
                </div>
                <div className='unfinished'>
                    <h2>Unfinished</h2>
                    {
                        tasksArray.filter(element => (element.status !== "completed" && element.createdBy === user)).map(task => { return (
                            <div key={task.id} className='task'>
                                <h4>{task.title}</h4>
                                <p className={task.priority}>{task.priority}</p>
                                <p>{task.deadline}</p>
                                <p>{task.date}</p>
                                <p className={task.status}>{task.status}</p>
                            </div>
                        )})
                    }
                </div>
                
            </div>
        </div>
    )
}

export default History;