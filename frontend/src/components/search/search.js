import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState, useEffect } from 'react';
import "./search.css"

const Search = ({setSelected, user}) => {
    const inputRef = useRef(null)
    const selectRef = useRef(null)
    const [active, setActive] = useState("none")
    const [tasksArray, setTasksArray] = useState([])
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        //fetch the tasks from the database
        fetch('/api/tasks/getTasks')
        .then(res => res.json())
        .then(data => {
            setTasksArray(data)
        })
        .catch(err => console.log(err));

    })

    const handleSearch = (value) => {
        if(value === "") {
            setTasks([])
        }
        else {
            setTasks(tasksArray.filter(task => (task.title.toUpperCase().indexOf(value.toUpperCase()) !== -1 && task.createdBy === user)))
        }
    }

    const handleChange = () => {
        setSelected(selectRef.current.selectedOptions[0].textContent)
    }

    return (
        <div className="search">
            <FontAwesomeIcon icon={faSearch} onClick={() => inputRef.current.focus()}/>
            <input type="text" placeholder="Search tasks" ref={inputRef} onChange={(e) => handleSearch(e.target.value)}/>
            <FontAwesomeIcon icon={faFilter} onClick={() => (active === "none") ? setActive("block") : setActive("none")}/>
            <select style={{ display: active }} onChange={() => handleChange()} ref={selectRef}>
                <option>all</option>
                <option>completed</option>
                <option>remaining</option>
            </select>
            <div className='search-results'>
                {
                    tasks.map(task => { return(
                        <h3 key={task.id}>{task.title}</h3>
                    )})
                }
            </div>
        </div>
    )
}

export default Search;