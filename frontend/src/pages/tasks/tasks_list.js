import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEllipsisVertical, faBarsProgress, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./tasks.css"
import { useState, useEffect } from "react";

const TasksList = ({ selected, user, space }) => {
    const [tasksArray, setTasksArray] = useState([])
    const [tasks, setTasks] = useState([])
    const [loading, setLoad] = useState(true)
    const [options, setOptions] = useState({show: false, id: 0})

    useEffect(() => {
        //fetch the tasks from the database
        fetch('/api/tasks/getTasks')
        .then(res => res.json())
        .then(data => {
            setTasksArray(data)
            setLoad(false)
        })
        .catch(err => console.log(err));

        //Filter the tasks based on the search filter
        if(selected === "all") {
            setTasks(tasksArray)
        }
        else if(selected === "completed") {
            setTasks(tasksArray.filter(task => task.status === 'completed'))
        }
        else if(selected === "remaining") {
            setTasks(tasksArray.filter(task => task.status !== 'completed'))
        }
        else {
            setTasks(tasksArray)
        }
    }, [selected, setTasks, tasksArray])

    
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


    return (
        <div className="tasks-container">
            <div className="tasks-container__box list">
                <h3>{selected}</h3>
                { (loading) ? "loading" :
                   tasks.filter(element => (element.createdBy === user && element.space === space)).map(task => { return (  
                        <div key={task.id} className="task-grids">
                            <h4>{task.title}</h4>

                            <p>{task.duration}</p>
                            <p>{task.date}</p>
                            <p className={`status ${task.status}`} >{task.status}</p>
                            <FontAwesomeIcon icon={faEllipsisVertical} style={{ padding: "20" }} onClick={() => setOptions({show: !options.show, id: task.id})}/>
                            <div className={`options-select ${(options.show && options.id === task.id) ? "active" : "" }`}>
                                <p onClick={() => handleStatus(task.id, "status", "completed")}><FontAwesomeIcon icon={faCheckCircle} /> Mark as Completed</p>
                                <p onClick={() => handleStatus(task.id, "status", "ongoing")}><FontAwesomeIcon icon={faBarsProgress} /> Mark as Started</p>
                                <p onClick={() => handleDelete(task.id)}><FontAwesomeIcon icon={faTrashCan} /> Delete</p>
                            </div>
                        </div>
                    )})
                }
            </div>
        </div>
    )
}

export default TasksList;