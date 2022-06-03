import Search from "../../components/search/search"
import SideNav from "../../components/sideNav/sideNav"
import './tasks.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faList } from "@fortawesome/free-solid-svg-icons";
import CreateTask from "../../components/tasks_components/create_tasks/createTask";
import TasksList from "../../components/tasks_components/tasks_list/tasks_list";

const Tasks = ({ user, tasksArray }) => {
    const [view, setView] = useState("grid")
    const [filter, setFilter] = useState("all")
    const [tasks, setTasks] = useState([])


    useEffect(() => {
        //filter the tasks
        if(filter === "all") {
            setTasks(tasksArray)
        }
        else if(filter === "completed") {
            setTasks(tasksArray.filter(task => task.status === 'completed'))
        }
        else if(filter === "remaining") {
            setTasks(tasksArray.filter(task => task.status !== 'completed'))
        }
        else if(filter === "important") {
            setTasks(tasksArray.filter(task => task.priority === 'High'))
        }
        else if(filter === "recurring") {
            setTasks(tasksArray.filter(task => task.recurring === 'Yes'))
        }
        else {
            setTasks(tasksArray)
        }

    }, [filter, tasksArray, setTasks])


    return (
        <div className="tasks">
            <SideNav />
            <section>
                <Search/>
                <div className="tasks-container">
                    <CreateTask user={user} />
                    <div className="top-board">
                        <h2 onClick={() => setFilter("all")} className={(filter === "all")? "active" : ""}>All <span>{tasksArray && tasksArray.filter(task => task.createdBy === user).length}</span></h2>
                        <h2 onClick={() => setFilter("completed")} className={(filter === "completed")? "active" : ""}>Completed <span>{tasksArray && tasksArray.filter(task => task.status === 'completed' && task.createdBy === user).length}</span></h2>
                        <h2 onClick={() => setFilter("important")} className={(filter === "important")? "active" : ""}>Important <span>{tasksArray && tasksArray.filter(task => task.priority === 'High' && task.createdBy === user).length}</span></h2>
                        <h2 onClick={() => setFilter("remaining")} className={(filter === "remaining")? "active" : ""}>Remaining <span>{tasksArray && tasksArray.filter(task => task.status !== 'completed' && task.createdBy === user).length}</span></h2>
                        <h2 onClick={() => setFilter("recurring")} className={(filter === "recurring")? "active" : ""}>Recurring <span>{tasksArray && tasksArray.filter(task => task.recurring === 'Yes' && task.createdBy === user).length}</span></h2>
                        <h2 className="change-view">
                                <FontAwesomeIcon icon={faTh} onClick={() => setView("grid")} className={(view === "grid")? "active" : ""} title="grid view"/>
                                <FontAwesomeIcon icon={faList} onClick={() => setView("list")} className={(view === "list")? "active" : ""}  title="list view" />
                        </h2>
                    </div>
                    <TasksList view={view} tasksArray={tasks} user={user}/>
                </div>
            </section>

        </div>
    )
}

export default Tasks