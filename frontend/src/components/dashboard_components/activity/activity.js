import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; 
import "./activity.css"

const Activity = ({ user, tasksArray }) => {
    const [salesctx, setSalesCtx] = useState()
    const [tasks, setTasks] = useState()
    const [todayTasks, setTodayTasks] = useState()
    const [yesterdayTasks, setYesterdayTasks] = useState()
    const [dbyTasks, setDby] = useState()
    const [ddbyTasks, setDdby] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const today = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`
        const yesterday = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate() - 1}`
        const dby = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate() - 2}`
        const ddby = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate() - 3}`
    
        setTasks(tasksArray.filter(task => task.createdBy === user))
        setTodayTasks(tasksArray.filter(task => (task.date === today)))
        setYesterdayTasks(tasksArray.filter(task => (task.date === yesterday)))
        setDby(tasksArray.filter(task => (task.date === dby)))
        setDdby(tasksArray.filter(task => (task.date === ddby)))

        
        setLoading(false)

        let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

        if (!loading) {
        setSalesCtx({
                 labels: [days[new Date().getDay() - 3], days[new Date().getDay() - 2], days[new Date().getDay() - 1], days[new Date().getDay()]],
                 datasets: [{
                     label: '',
                     data: [
                         ddbyTasks.filter(task => task.status === "completed").length, 
                         dbyTasks.filter(task => task.status === "completed").length, 
                         yesterdayTasks.filter(task => task.status === "completed").length, 
                         todayTasks.filter(task => task.status === "completed").length
                    ],
                     options: {
                         scales: {
                             y: {
                                 beginAtZero: true
                             }
                         },
                     },
                     backgroundColor: [
                         'rgba(255, 255, 232, 0)'
                     ],
                     borderColor: [
                         'rgba(99, 132, 255, 0.3)'
                     ],
                     pointBackgroundColor: [
                         'rgba(40, 50, 0, 0.6)'
                     ],
                     borderWidth: 4,
                     tension: 0.4
        }]
    }) }

    }, [setSalesCtx, tasks, todayTasks, yesterdayTasks, dbyTasks,ddbyTasks, user, tasksArray, setLoading, loading])


    return (
        <div className="activity">
            <h2>Activity</h2>
            <div className='History'> 
            {
                   (salesctx !== undefined) ?
                    <Line data={salesctx} options={{ maintainAspectRatio: true }} />
                    :
                    ""
               }  
            </div>
        </div>
    )
}

export default Activity;