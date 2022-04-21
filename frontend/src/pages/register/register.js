import "./register.css"

const Register = () => {
    return (
        <div className="register">
                <h1>Register</h1>

                <p>Already registered? <a href="/login">Login now</a></p>

                <form action="/api/user/registerHandler" method="post">
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