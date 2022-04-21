import "./login.css"

const Login = () => {
    return (
        <div className="login">
                <h1>Login</h1>

                <p>Haven't registered yet? <a href="/register">Register now</a></p>

                <form action="/api/user/loginhandler" method="post">
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