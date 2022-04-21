import Overview from "../../components/dashboard_components/overview"
import Activity from "../../components/dashboard_components/activity"
import Search from "../../components/search/search"
import SideNav from "../../components/sideNav/sideNav"
import "../../components/dashboard_components/dashboard.css"
import { useEffect, useState } from 'react';
import History from "../../components/dashboard_components/history"

const Dashboard = ({ user }) => {
    const [tasksArray, setTasksArray] = useState([])


    useEffect(() => {
        //fetch the tasks from the database
        fetch('/api/tasks/getTasks')
        .then(res => res.json())
        .then(data => {
            setTasksArray(data)
        })
        .catch(err => console.log(err));

    })

    return (
        <div className="dashboard">
            <SideNav user={user}/>
            <section>
                <Search user={user}/>
                <div className="charts_and_info">
                    <Overview user={user} tasksArray={tasksArray}/>
                    <Activity user={user} tasksArray={tasksArray}/>
                </div>
                <History user={user} tasksArray={tasksArray} />
                
            </section>
           
        </div>
    )
}

export default Dashboard