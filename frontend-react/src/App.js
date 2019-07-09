import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
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
  const projects = useQuery(GET_PROJECTS)
  return (
    <div className="main-container">
      <SideBar />
      <div className="content-container">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Calendar projects={projects} />
      </div>
    </div>
  )
}

export default App
