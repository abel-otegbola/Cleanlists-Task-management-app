import { useState, useEffect } from "react"
import "./register.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

const Register = () => {    
    const [status, setStatus] = useState({})
    const [statusDisplay, setStatusDisplay] = useState("flex")

    useEffect(() => {
        fetch("/api/user/registerStatus")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setStatus(data)
        })
        .then(err => console.log(err))
    }, [])

    return (
        <div className="register">
                <h1>Register</h1>

                <p>Already registered? <a href="/login">Login now</a></p>

                <form action="/api/user/registerHandler" method="post">
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
                        <input id="username" name="name" type="text" autoComplete="username" required autoFocus/>
                    </label>
                    <label>
                        <h4>Email</h4>
                        <input id="email" name="email" type="email" autoComplete="email" required/>
                    </label>
                    <label>
                        <h4>password</h4>
                        <input id="current-password" name="password" type="password" autoComplete="current-password" required/>
                    </label>
                    <button type="submit">Register</button>
                </form>
        </div>
    )
}

export default Register;