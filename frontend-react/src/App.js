import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import Calendar from './components/Calendar'
import SideBar from './components/SideBar'
import Project from './components/Project'
import User from './components/User'
import Report from './components/Report'

import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState()

  if (!currentUser) {
    return (
      <div>
        <Switch>
          <Route path="/login" render={() => <Login setCurrentUser={setCurrentUser} />} />
          <Route path="/register" render={() => <Register setCurrentUser={setCurrentUser} />} />
          <Redirect path="/" to="/login" />
        </Switch>
      </div>
    )
  }
  return (
    <div className="main-container">
      <SideBar admin={currentUser.admin} />
      <div className="content-container">
        <Switch>
          <Route path="/calendar" render={() => <Calendar currentUser={currentUser} />} />
          <Route path="/users" render={() => <User />} />
          <Route
            path={['/report/table', '/report/chart', '/report/project/:id']}
            render={({ match }) => <Report match={match} />}
          />
          <Redirect path="/report" to="/report/table" />
          <Route path="/logout" render={() => <Logout setCurrentUser={setCurrentUser} />} />
          <Route path="/projects" render={() => <Project currentUser={currentUser} />} />
          <Redirect path="/" to="/calendar" />
        </Switch>
      </div>
    </div>
  )
}

export default App
