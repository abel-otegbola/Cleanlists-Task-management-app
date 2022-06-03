import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faEllipsisVertical, faBarsProgress, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./tasks_list.css"
import { useEffect, useState } from "react";
import task_bg from "../../../assets/imgs/task-bg.JPG"



const TasksList = ({ user, view, tasksArray }) => {
    const [options, setOptions] = useState({show: false, id: 0})
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        setTasks(tasksArray)
    }, [tasksArray, user])
    
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
            <div className={`tasks-container__box ${view}`}>
                        { 
                            tasks.filter(element => (element.createdBy === user)).map(task => { return (  
                                <div key={task.id} className={`task-grids ${task.status}`}>
                                    {/* <img src={task_bg} alt="task-bg"/> */}
                                    <h4>{task.title}</h4>

                                    <p><span>{task.date}</span> | <span>{task.deadline} min</span></p>
                                    <p className={`status ${task.status}`}><span>{task.priority}</span>{task.status}</p>
                                    <p>{task.space}</p>
                                    <FontAwesomeIcon icon={faEllipsisVertical} className="options" onClick={() => setOptions({show: !options.show, id: task.id})}/>
                                    <div className={`options-select ${(options.show && options.id === task.id) ? "active" : "" }`} >
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