import { useEffect, useState } from "react";
import "./create_tasks.css"

const CreateTask = ({ user }) => {
    const [spaces, setSpaces] = useState([])

    useEffect(() => {
        //fetch the spaces from the database
        fetch('/api/spaces/getSpaces')
        .then(res => res.json())
        .then(data => setSpaces(data))
        .catch(err => console.log(err));
    }, [setSpaces])

    return (
        <div className="create-tasks">
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
                    <input type="text" name="deadline" placeholder="How long in minutes"/>
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
        </div>
    )
}

export default CreateTask;