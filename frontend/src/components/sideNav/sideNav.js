import { useState, useRef, useEffect } from "react"
import demoUser from "../../assets/imgs/demouser.jpg"
import "./sideNav.css"
import { useLocation } from "react-router-dom"

//fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle, faDashboard, faBell, faBank, faUser, faComments, faIdBadge, faCog, faSignOut, faChevronLeft, faTasks, faBox } from '@fortawesome/free-solid-svg-icons'


const SideNav = () => {
    const [toggle, setToggle] = useState("open")
    const [user, setUser] = useState("")
    const inputRef = useRef()
    const location = useLocation()

    useEffect(() => {
        fetch('/api/user/getUser')
        .then(res => res.json())
        .then(data => setUser(data.user))
        .catch(err => console.log(err))
    }, [])

    const logout = () => {
        fetch('/api/user/logout')
        .then(res => console.log(res.json()))
        .catch(err => console.log(err));
    }

    const handleToggle = () => {
        (toggle === "open") ? setToggle("close") : setToggle("open")
        console.log(location.pathname)
    }



    return (
        <div className={`side-nav ${toggle}`}>
            <div onClick={() => handleToggle()} className="toggle"><FontAwesomeIcon icon={faChevronLeft} /></div>
            <div className="user">
                <img src={demoUser} width="30" height="30" alt="user"/>
                <h4>{(user !== "")? user : "Welcome"}</h4>
            </div>

            <div className="search">
                <FontAwesomeIcon icon={faSearch} onClick={() => inputRef.current.focus()}/>
                <input type="text" placeholder="Search" ref={inputRef} />
                <FontAwesomeIcon icon={faTimesCircle} onClick={() => inputRef.current.value = ""}/>
            </div>

            <div className="side-nav__main">
                <p>OVERVIEW</p>
                <ul>
                    <li><a className={(location.pathname === "/dashboard") ? "active" : ""} href="/dashboard"> <FontAwesomeIcon icon={faDashboard} /> <span>Dashboard</span></a></li>
                    <li><a className={(location.pathname === "/spaces") ? "active" : ""} href="/spaces"> <FontAwesomeIcon icon={faBox} /> <span>Spaces</span></a></li>
                    <li><a className={(location.pathname === "/tasks") ? "active" : ""} href="/tasks"> <FontAwesomeIcon icon={faTasks} /> <span>Tasks</span></a></li>
                    <li><a className={(location.pathname === "/notifications") ? "active" : ""} href="/notifications"> <FontAwesomeIcon icon={faBell} /> <span>Notifications</span></a></li>
                    <li><a className={(location.pathname === "/finance") ? "active" : ""} href="/finance"> <FontAwesomeIcon icon={faBank} /> <span>Finance</span></a></li>
                </ul>
            </div>

            <div className="side-nav__bottom" >
                <ul>
                    <li><a href="/dashboard"> <FontAwesomeIcon icon={faUser} /></a></li>
                    <li><a href="/dashboard"> <FontAwesomeIcon icon={faComments} /></a></li>
                    <li><a href="/dashboard"> <FontAwesomeIcon icon={faIdBadge} /></a></li>
                    <li><a href="/dashboard"> <FontAwesomeIcon icon={faCog} /></a></li>
                    <li><a onClick={() => logout()} href="/"> <FontAwesomeIcon icon={faSignOut} /></a></li>
                </ul>
            </div>
        </div>
    )
}

export default SideNav;