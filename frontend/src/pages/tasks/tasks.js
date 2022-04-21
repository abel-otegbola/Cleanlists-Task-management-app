import Search from "../../components/search/search"
import SideNav from "../../components/sideNav/sideNav"
import './tasks.css'
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh, faCheckCircle, faList, faBox, faBoxesPacking, faRetweet, faEllipsisVertical, faBarsProgress, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const Tasks = ({ user }) => {
    const [selected, setSelected] = useState("")
    const [view, setView] = useState("grid")
    const [filter, setFilter] = useState("all")
    const [tasksArray, setTasksArray] = useState([])
    const [tasks, setTasks] = useState([])
    const [spaces, setSpaces] = useState([])
    const [options, setOptions] = useState({show: false, id: 0})
    const [loading, setLoad] = useState(true)


    useEffect(() => {
        //fetch the tasks from the database
            fetch('/api/tasks/getTasks')
            .then(res => res.json())
            .then(data => {
                setTasksArray(data)
                setLoad(false)
            })
            .catch(err => console.log(err));

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

        //fetch the spaces from the database
            fetch('/api/spaces/getSpaces')
            .then(res => res.json())
            .then(data => setSpaces(data))
            .catch(err => console.log(err));


    }, [filter, tasksArray, setTasks, setSpaces, setTasksArray, setLoad])

    //change the status of the tasks from upcoming to ongoing/completed
    const handleStatus = (id, para, change) => {
        fetch('/api/tasks/changeStatus', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id, para, change})
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    //Delete a task from the database
    const handleDelete = (id) => {
        fetch('/api/tasks/deleteTask', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id})
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }

    const handleDeadline = (id, deadline) => {
        if(deadline === 0) {
            return "deadline reached"
        }
        else {
            return deadline
        }
    }


    return (
        <div className="tasks">
            <SideNav />
            <section>
                <Search setSelected={setSelected}/>
                <div className="tasks-container">
                    <div className="top-board">
                        <h2 onClick={() => setFilter("all")} className={(filter === "all")? "active" : ""}><FontAwesomeIcon icon={faList} /> All</h2>
                        <h2 onClick={() => setFilter("completed")} className={(filter === "completed")? "active" : ""}><FontAwesomeIcon icon={faCheckCircle} /> Completed</h2>
                        <h2 onClick={() => setFilter("important")} className={(filter === "important")? "active" : ""}><FontAwesomeIcon icon={faBox} /> Important</h2>
                        <h2 onClick={() => setFilter("remaining")} className={(filter === "remaining")? "active" : ""}><FontAwesomeIcon icon={faBoxesPacking} /> Remaining</h2>
                        <h2 onClick={() => setFilter("recurring")} className={(filter === "recurring")? "active" : ""}><FontAwesomeIcon icon={faRetweet} /> Recurring</h2>
                        <h2 className="change-view">
                                <FontAwesomeIcon icon={faTh} onClick={() => setView("grid")} className={(view === "grid")? "active" : ""} title="grid view"/>
                                <FontAwesomeIcon icon={faList} onClick={() => setView("list")} className={(view === "list")? "active" : ""}  title="list view" />
                        </h2>
                    </div>
                        <h4>Create new task</h4>
                    <form className="create-task" action="/api/tasks/createTask" method="post">
                        <label>
                            <p>Task:</p>
                            <input type="text" name="title" />
                        </label>
                        <label>
                            <p>Space:</p>
                            <select name="space">
                                {
                                    spaces.filter(element => element.createdBy === user).map(space => { return ( <option key={space.id}>{space.name}</option> )})
                                }
                            </select>
                        </label>
                        <label>
                            <p>Date:</p>
                            <input type="date" name="date" />
                        </label>
                        <label>
                            <p>Duration:</p>
                            <div style={{ display: "flex" }}>
                                <input type="text" name="deadline" placeholder="How long in minutes"/>
                            </div>
                            
                        </label>
                        <label>
                            <p>Priority:</p>
                            <select name="priority">
                                <option>High</option>
                                <option>Low</option>
                            </select>
                        </label>
                        <label>
                            <p>Recurring:</p>
                            <select name="recurring">
                                <option>Yes</option>
                                <option>No</option>
                            </select>
                        </label>
                        <label style={{ display: "none" }}>
                            <p>status:</p>
                            <input type="text" name="status" value="upcoming" readOnly/>
                        </label>
                        <label style={{ display: "none" }}>
                            <p>user:</p>
                            <input type="text" name="createdBy" value={user} readOnly/>
                        </label>
                        <button type="submit" >Add task</button>
                    </form>
                    <div className={`tasks-container__box ${view}`}>
                        <h3>{selected}</h3>
                        {
                           (loading) ? "loading"
                           : tasks.filter(element => (element.createdBy === user) ).map(task => { return (  
                                <div key={task.id} className={`task-grids ${task.status}`}>
                                    <h4>
                                    {task.title}</h4>

                                    <p><span>{task.date}</span> | <span>{task.deadline} min</span></p>
                                    <p className={`status ${task.status}`}><span>{task.priority}</span>{(task.status === "ongoing") ? handleDeadline(task.id, task.deadline) : task.status}</p>
                                    <p>{task.space}</p>
                                    <FontAwesomeIcon icon={faEllipsisVertical} className="options" onClick={() => setOptions({show: !options.show, id: task.id})}/>
                                    <div className={`options-select ${(options.show && options.id === task.id) ? "active" : "" }`} >
                                        <p onClick={() => handleStatus(task.id, "status", "completed")}><FontAwesomeIcon icon={faCheckCircle} /> Mark as Completed</p>
                                        <p onClick={() => handleStatus(task.id, "status", "ongoing")}><FontAwesomeIcon icon={faBarsProgress} /> Mark as Started</p>
                                        <p onClick={() => handleDelete(task.id)}><FontAwesomeIcon icon={faDeleteLeft} /> Delete</p>
                                    </div>
                                </div>
                            )})
                        }
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Tasks