import React, { useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import Login from './components/Login'
import Logout from './components/Logout'
import Register from './components/Register'
import Calendar from './components/Calendar'
import SideBar from './components/SideBar'

import './App.css'

const GET_PROJECTS = gql`
  query allProjects {
    allProjects {
      name
      id
      tasks {
        name
        id
        description
      }
    }
  }
`

function App() {
  const [currentUser, setCurrentUser] = useState()
  const projects = useQuery(GET_PROJECTS)

  if (!currentUser) {
    return (
      <div>
        <Switch>
          <Route
            path="/login"
            render={() => <Login setCurrentUser={setCurrentUser} />}
          />
          <Route
            path="/register"
            render={() => <Register setCurrentUser={setCurrentUser} />}
          />
          <Redirect path="/" to="/login" />
        </Switch>
      </div>
    )
  }
  return (
    <div className="main-container">
      <SideBar />
      <div className="content-container">
        <Switch>
          <Route
            path="/calendar"
            render={() => <Calendar projects={projects} />}
          />
          <Route
            path="/logout"
            render={() => <Logout setCurrentUser={setCurrentUser} />}
          />
          <Redirect path="/" to="/calendar" />
        </Switch>
      </div>
    </div>
  )
}

export default App
