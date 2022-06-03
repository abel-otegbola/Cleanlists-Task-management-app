import { useState } from "react"
import "./sideNav.css"
import { useLocation } from "react-router-dom"
import demouser from "../../assets/imgs/demouser.jpg"

//fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDashboard, faBell, faCog, faSignOut, faTasks, faBox, faNavicon } from '@fortawesome/free-solid-svg-icons'


const SideNav = () => {
    const [toggle, setToggle] = useState("open")
    const location = useLocation()

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
        <>
        <div onClick={() => handleToggle()} className="toggle"><FontAwesomeIcon icon={faNavicon} /></div>
        <div className={`side-nav ${toggle}`}>
            <div className="user">
                <img src={demouser} alt="user"/>
                <p>Daniel Essein</p>
            </div>

            <div className="side-nav__main">
                <p>General</p>
                <ul>
                    <li><a className={(location.pathname === "/dashboard") ? "active" : ""} href="/dashboard"> <FontAwesomeIcon icon={faDashboard} /> <span>Dashboard</span></a></li>
                    <li><a className={(location.pathname === "/spaces") ? "active" : ""} href="/spaces"> <FontAwesomeIcon icon={faBox} /> <span>Spaces</span></a></li>
                    <li><a className={(location.pathname === "/tasks") ? "active" : ""} href="/tasks"> <FontAwesomeIcon icon={faTasks} /> <span>Tasks</span></a></li>
                    <li><a className={(location.pathname === "/notifications") ? "active" : ""} href="/notifications"> <FontAwesomeIcon icon={faBell} /> <span>Notifications</span></a></li>
                </ul>
                <p>Tools</p>
                <ul>
                    <li><a className={(location.pathname === "/settings") ? "active" : ""} href="/settings"> <FontAwesomeIcon icon={faCog} /> <span>Settings</span></a></li>
                    <li><a onClick={() => logout()} href="/"> <FontAwesomeIcon icon={faSignOut} /> <span>Logout</span></a></li>
                </ul>
            </div>
        </div>
        </>
    )
}

export default SideNav;