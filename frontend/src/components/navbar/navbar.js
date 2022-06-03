import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDashboard, faSignOutAlt, faTasksAlt } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/imgs/logo.svg"
import "./navbar.css"

const Navbar = ({ user, logout }) => {

    return(
        <div className="navbar">
            <div className="brand">
                <img src={logo} width="25" alt="logo" className="logo" />
                <a href="/">Cleanlists</a>
            </div>

            <div className="menu">
                <div className="user" id="user">{(user === undefined || user === "" || user === null)? <a href="/login">Login</a> : "Account" }</div>
                <nav style={{ display: (user === "" || user === undefined)? "none": "" }}>
                    <ul>
                        <li><a href="/dashboard"><FontAwesomeIcon icon={faDashboard}/> Dashboard</a></li>
                        <li><a href="/spaces"><FontAwesomeIcon icon={faTasksAlt}/> Spaces</a></li>
                        <li><a href="/" onClick={() => logout()}><FontAwesomeIcon icon={faSignOutAlt}/> Logout</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Navbar