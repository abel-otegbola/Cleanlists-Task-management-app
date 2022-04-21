import Search from "../../components/search/search"
import SideNav from "../../components/sideNav/sideNav"
import "./spaces.css"
import TasksList from "../tasks/tasks_list"
import { useEffect, useState } from 'react';
import SpaceList from "../../components/spaces_components/spaces_list";

const Spaces = ({ user }) => {
    const [selected, setSelected] = useState("")
    const [spaces, setSpaces] = useState([])
    const [space, setSpace] = useState("")

    useEffect(() => {
        fetch('/api/spaces/getSpaces')
        .then(res => res.json())
        .then(data => setSpaces(data))
        .catch(err => console.log(err));
    }, [setSpaces])


    return (
        <div className="spaces">
            <SideNav />
            <section>
                <Search setSelected={setSelected} user={user}/>
                <div className="spaces-board">
                    <SpaceList spaces={spaces} user={user} setSpace={setSpace}/>
                </div>
                <TasksList selected={selected} user={user} space={space}/>
                
            </section>

        </div>
    )
}

export default Spaces