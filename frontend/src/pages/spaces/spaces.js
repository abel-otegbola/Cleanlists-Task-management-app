import Search from "../../components/search/search"
import SideNav from "../../components/sideNav/sideNav"
import "./spaces.css"
import TasksList from "../../components/tasks_components/tasks_list/tasks_list"
import { useEffect, useState } from 'react';
import SpaceList from "../../components/spaces_components/spaces_list";

const Spaces = ({ user, tasksArray }) => {
    const [selected, setSelected] = useState("")
    const [spaces, setSpaces] = useState([])
    const [tasks, setTasks] = useState([])
    const [active, setActive] = useState("")

    useEffect(() => {
        fetch('/api/spaces/getSpaces')
        .then(res => res.json())
        .then(data => setSpaces(data))
        .catch(err => console.log(err));

        setTasks(tasksArray.filter(task => task.space === active))

    }, [setSpaces, active, tasksArray])


    return (
        <div className="spaces">
            <SideNav />
                <section>
                <Search setSelected={setSelected} user={user}/>
                <div className="spaces-board">
                    <SpaceList spaces={spaces} user={user} setActive={setActive} active={active}/>
                </div>
                <TasksList selected={selected} user={user} tasksArray={tasks} view={"list"}/>
            </section>

        </div>
    )
}

export default Spaces