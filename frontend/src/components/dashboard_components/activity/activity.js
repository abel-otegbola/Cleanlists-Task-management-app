import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2'; 
import "./activity.css"

const Activity = ({ user, tasksArray }) => {
    const [salesctx, setSalesCtx] = useState()
    const [tasks, setTasks] = useState()
    const [todayTasks, setTodayTasks] = useState([])
    const [yesterdayTasks, setYesterdayTasks] = useState([])
    const [dbyTasks, setDby] = useState([])
    const [ddbyTasks, setDdby] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const yTimeStamp = new Date().getTime() - 24*60*60*1000
        const dbyTimeStamp = new Date().getTime() - (48*60*60*1000)
        const ddbyTimeStamp = new Date().getTime() - (72*60*60*1000)

        const today = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`
        const yesterday = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date(yTimeStamp).getDate()}`
        const dby = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date(dbyTimeStamp).getDate()}`
        const ddby = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date(ddbyTimeStamp).getDate()}`
    
        setTasks(tasksArray.filter(task => task.createdBy === user))
        setTodayTasks(tasksArray.filter(task => (task.date === today && task.createdBy === user)))
        setYesterdayTasks(tasksArray.filter(task => (task.date === yesterday && task.createdBy === user)))
        setDby(tasksArray.filter(task => (task.date === dby && task.createdBy === user)))
        setDdby(tasksArray.filter(task => (task.date === ddby && task.createdBy === user)))


        
        setLoading(false)

        let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
        let date = new Date().getDay()

        if (!loading) {
        setSalesCtx({
                 labels: [
                    days[(date === 2) ? 6 : (date === 1) ? 5 : (date === 0) ? 4 : date - 3], 
                    days[(date === 1) ? 6 : (date === 0) ? 5 : date - 2], 
                    days[(date === 0) ? 6 : date - 1], 
                    days[date]
                ],
                 datasets: [{
                     label: '',
                     data: [
                         ddbyTasks.filter(task => task.status === "completed").length || 0, 
                         dbyTasks.filter(task => task.status === "completed").length || 0, 
                         yesterdayTasks.filter(task => task.status === "completed").length || 0, 
                         todayTasks.filter(task => task.status === "completed").length || 0
                    ],
                     options: {
                         scales: {
                             y: {
                                 beginAtZero: true
                             }
                         },
                     },
                     backgroundColor: [
                         'rgba(232, 255, 255, 0)'
                     ],
                     borderColor: [
                         'rgba(132, 255, 132, 0.3)'
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
            <h3>Activity</h3>
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