import Overview from "../../components/dashboard_components/overview/overview"
import Activity from "../../components/dashboard_components/activity/activity"
import History from "../../components/dashboard_components/history/history"
import Search from "../../components/search/search"
import SideNav from "../../components/sideNav/sideNav"
import "./dashboard.css"

const Dashboard = ({ user, tasksArray }) => {

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