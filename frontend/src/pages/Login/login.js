import { useEffect, useState } from "react"
import "./login.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    // const [username, setUsername] = useState("")
    const [status, setStatus] = useState({})
    const [statusDisplay, setStatusDisplay] = useState("flex")

    useEffect(() => {
        fetch("/api/user/loginStatus")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setStatus(data)
        })
        .then(err => console.log(err))
    }, [])

    return (
        <div className="login">
                <h1>Login</h1>

                <p>Haven't registered yet? <a href="/register">Register now</a></p>

                <form action="/api/user/loginhandler" method="post">
                    <p style={{ display: (status === {} || status.msg === "" || statusDisplay === "none")? "none" : "flex", 
                                backgroundColor: (status.status === "fail")? "#fef2e9" : "#ebfee9",
                                color: (status.status === "fail")? "rgb(225, 58, 58)" : "rgb(58, 225, 94)" }} 
                        className="errMsg"
                    >
                        <span>{status.msg}</span> 
                        <FontAwesomeIcon icon={faTimesCircle} onClick={() => setStatusDisplay("none")} />
                    </p>
                    <label>
                        <h4>Name</h4>
                        <input id="username" name="username" type="text" autoComplete="username" required autoFocus/>
                    </label>
                    <label>
                        <h4>password</h4>
                        <input id="current-password" name="password" type="password" autoComplete="current-password" required/>
                    </label>
                    <button type="submit">Login</button>
                </form>


        </div>
    )
}

export default Login;