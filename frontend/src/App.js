import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Home from "./pages/home/home";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Dashboard from "./pages/dashboard/dashboard";
import Spaces from "./pages/spaces/spaces";
import Tasks from "./pages/tasks/tasks";
import Login from "./pages/Login/login";
import Register from "./pages/register/register";


function App() {
  const [user, setUser] = useState("")
  const [tasksArray, setTasksArray] = useState([])

  useEffect(() => {
    //fetch user
    fetch('/api/user/getUser')
    .then(res => res.json())
    .then(data => setUser(data.user))
    .catch(err => console.log(err))

    //fetch the tasks from the database
    fetch('/api/tasks/getTasks')
    .then(res => res.json())
    .then(data => {
        setTasksArray(data)
    })
    .catch(err => console.log(err));
  }, [])

  const logout = () => {
    fetch('/api/user/logout')
    .then(res => console.log(res.json()))
    .catch(err => console.log(err));
  }


  return (
    <div className="App">
      <Router>
        <Navbar user={user} logout={logout} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard user={user} tasksArray={tasksArray}/>} />
          <Route exact path="/spaces" element={<Spaces  user={user} tasksArray={tasksArray}/>} />
          <Route exact path="/tasks" element={<Tasks user={user} tasksArray={tasksArray} />} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/register" element={<Register/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
